import * as core from '@actions/core'
import * as github from '@actions/github'

export function getInputs(): {
  appId: number
  privateKey: string
  installationId: number
  startHour: number
  endHour: number
} {
  return {
    appId: +core.getInput('appId'),
    privateKey: core.getInput('privateKey'),
    installationId: +core.getInput('installationId'),
    startHour: +core.getInput('startHour'),
    endHour: +core.getInput('endHour')
  }
}

export function getContext(): {
  repository_owner: string
  repository_name: string
} {
  return {
    repository_owner: github.context.repo.owner,
    repository_name: github.context.repo.repo
  }
}
