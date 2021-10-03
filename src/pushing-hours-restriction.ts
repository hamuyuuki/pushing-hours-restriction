import {createAppAuth} from '@octokit/auth-app'
import {Octokit} from '@octokit/rest'
import {utcToZonedTime} from 'date-fns-tz'
import Holidays from 'date-holidays'

import {githubClient} from './client'
import {
  DefaultBranchProtectionRule,
  DefaultBranchProtectionRuleQuery,
  DefaultBranchProtectionRuleQueryVariables,
  UpdateDefaultBranchProtectionRule,
  UpdateDefaultBranchProtectionRuleMutation,
  UpdateDefaultBranchProtectionRuleMutationVariables
} from './generated/graphql'

const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function convertToWeekdayName(weekdayNumber: number): string {
  return weekdayNames[weekdayNumber]
}

export function currentPushableHours(
  weekdays: string[],
  startHour: number,
  endHour: number,
  timeZone: string,
  holiday: string
): boolean {
  const date_now = utcToZonedTime(new Date(), timeZone)

  if (new Holidays(holiday).isHoliday(date_now)) return false
  if (!weekdays.includes(convertToWeekdayName(date_now.getDay()))) return false
  if (date_now.getHours() < startHour || endHour <= date_now.getHours())
    return false

  return true
}

export async function updateBranchRestrictionRule(
  appId: number,
  privateKey: string,
  repositoryOwner: string,
  repositoryName: string,
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
      owner: repositoryOwner,
      repo: repositoryName
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
      owner: repositoryOwner,
      name: repositoryName
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
