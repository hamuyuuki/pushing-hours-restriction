import {createAppAuth} from '@octokit/auth-app'
import {Octokit} from '@octokit/rest'
import {utcToZonedTime} from 'date-fns-tz'
import {
  DefaultBranchProtectionRule,
  DefaultBranchProtectionRuleQuery,
  DefaultBranchProtectionRuleQueryVariables,
  UpdateDefaultBranchProtectionRule,
  UpdateDefaultBranchProtectionRuleMutation,
  UpdateDefaultBranchProtectionRuleMutationVariables
} from './generated/graphql'
import {githubClient} from './client'

const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function convertToWeekdayName(weekdayNumber: number): string {
  return weekdayNames[weekdayNumber]
}

export function currentPushableHours(
  weekdays: string[],
  startHour: number,
  endHour: number,
  timeZone: string
): boolean {
  const date_now = utcToZonedTime(new Date(), timeZone)

  if (!weekdays.includes(convertToWeekdayName(date_now.getDay()))) return false
  if (date_now.getHours() < startHour || endHour <= date_now.getHours())
    return false

  return true
}

export async function updateBranchRestrictionRule(
  appId: number,
  privateKey: string,
  repository_owner: string,
  repository_name: string,
  restrictsPushes: boolean
): Promise<void> {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId,
      privateKey
    }
  })

  const installationId = (
    await octokit.rest.apps.getRepoInstallation({
      owner: repository_owner,
      repo: repository_name
    })
  ).data.id

  const installedGithubApp = await createAppAuth({
    appId,
    privateKey
  })({type: 'installation', installationId})

  const {
    data: {repository}
  } = await githubClient(installedGithubApp.token).query<
    DefaultBranchProtectionRuleQuery,
    DefaultBranchProtectionRuleQueryVariables
  >({
    query: DefaultBranchProtectionRule,
    variables: {
      owner: repository_owner,
      name: repository_name
    }
  })

  if (!repository?.defaultBranchRef?.branchProtectionRule) {
    throw new Error(`Couldn't find defaultBranchProtectionRule id!`)
  }

  await githubClient(installedGithubApp.token).mutate<
    UpdateDefaultBranchProtectionRuleMutation,
    UpdateDefaultBranchProtectionRuleMutationVariables
  >({
    mutation: UpdateDefaultBranchProtectionRule,
    variables: {
      branchProtectionRuleId:
        repository.defaultBranchRef.branchProtectionRule.id,
      restrictsPushes
    }
  })
}
