import {getInputs, getContext} from './actions-toolkit'
import {
  currentPushableHours,
  updateBranchRestrictionRule
} from './pushing-hours-restriction'

async function run(): Promise<void> {
  const inputs = getInputs()
  const context = getContext()

  await updateBranchRestrictionRule(
    inputs.appId,
    inputs.privateKey,
    inputs.installationId,
    context.repository_owner,
    context.repository_name,
    !currentPushableHours(inputs.startHour, inputs.endHour)
  )
}

run()
