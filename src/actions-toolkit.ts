import * as core from '@actions/core'
import * as github from '@actions/github'

export function getInputs(): {
  appId: number
  privateKey: string
  weekdays: string[]
  startHour: number
  endHour: number
  timeZone: string
  holiday: string
} {
  return {
    appId: +core.getInput('app_id'),
    privateKey: core.getInput('private_key'),
    weekdays: core.getInput('weekdays').replace(' ', '').split(','),
    startHour: +core.getInput('start_hour'),
    endHour: +core.getInput('end_hour'),
    timeZone: core.getInput('time_zone'),
    holiday: core.getInput('holiday')
  }
}

export function getContext(): {
  repositoryOwner: string
  repositoryName: string
} {
  return {
    repositoryOwner: github.context.repo.owner,
    repositoryName: github.context.repo.repo
  }
}
