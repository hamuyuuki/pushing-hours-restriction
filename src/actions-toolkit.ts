import * as core from '@actions/core'
import * as github from '@actions/github'

export function getInputs(): {
  appId: number
  privateKey: string
  weekdays: string[]
  startHour: number
  endHour: number
  timeZone: string
} {
  return {
    appId: +core.getInput('app_id'),
    privateKey: core.getInput('privateKey'),
    weekdays: core.getInput('weekdays').replace(' ', '').split(','),
    startHour: +core.getInput('startHour'),
    endHour: +core.getInput('endHour'),
    timeZone: core.getInput('timeZone')
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
