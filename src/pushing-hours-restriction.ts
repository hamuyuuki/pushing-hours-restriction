import {graphql} from '@octokit/graphql'
import {createAppAuth} from '@octokit/auth-app'
import {Octokit} from '@octokit/rest'

export function currentPushableHours(
  startHour: number,
  endHour: number
): boolean {
  const date_now = new Date()
  if ([0, 5, 6].includes(date_now.getDay())) return false
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

  const graphqlWithAuth = graphql.defaults({
    request: {
      hook: createAppAuth({
        appId,
        privateKey,
        installationId
      }).hook
    }
  })

  const {repository} = await graphqlWithAuth(
    `
      {
        repository(owner: "${repository_owner}", name: "${repository_name}") {
          defaultBranchRef {
            branchProtectionRule {
              id
            }
          }
        }
      }
    `
  )

  await graphqlWithAuth(
    `
      mutation ($branchProtectionRuleId: String!, $restrictsPushes: Boolean!) {
        updateBranchProtectionRule(
          input: {
            branchProtectionRuleId: $branchProtectionRuleId,
            restrictsPushes: $restrictsPushes
          }
        ) {
          branchProtectionRule {
            pattern
            id
            restrictsPushes
          }
        }
      }
    `,
    {
      branchProtectionRuleId: repository.defaultBranchRef.branchProtectionRule.id,
      restrictsPushes
    }
  )
}
