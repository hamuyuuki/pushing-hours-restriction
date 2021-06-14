import * as core from '@actions/core'

import {getInputs, getContext} from './actions-toolkit'
import {
  currentPushableHours,
  updateBranchRestrictionRule
} from './pushing-hours-restriction'

async function run(): Promise<void> {
  try {
    const inputs = getInputs()
    const context = getContext()

    await updateBranchRestrictionRule(
      inputs.appId,
      inputs.privateKey,
      context.repositoryOwner,
      context.repositoryName,
      !currentPushableHours(
        inputs.weekdays,
        inputs.startHour,
        inputs.endHour,
        inputs.timeZone
      )
    )
  } catch (error) {
    core.setFailed(error.message)
    console.error(error.message)
  }
}

run()
