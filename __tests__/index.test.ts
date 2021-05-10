import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

describe('index', () => {
  describe('run()', () => {
    test('', () => {
      process.env['INPUT_APPID'] = process.env.APPID
      process.env['INPUT_PRIVATEKEY'] = process.env.PRIVATEKEY
      process.env['INPUT_WEEKDAYS'] = 'MON,TUE,WED,THU'
      process.env['INPUT_STARTHOUR'] = '10'
      process.env['INPUT_ENDHOUR'] = '18'
      process.env['INPUT_TIMEZONE'] = 'Etc/UTC'
      process.env['GITHUB_REPOSITORY'] = 'hamuyuuki/pushing-hours-restriction'

      const np = process.execPath
      const ip = path.join(__dirname, '..', 'lib', 'index.js')
      const options: cp.ExecFileSyncOptions = {
        env: process.env
      }

      try {
        cp.execFileSync(np, [ip], options)
      } catch (error) {
        expect(error.stderr.toString()).toBe(
          'GraphQL error: Only organization repositories can have users and team restrictions\n'
        )
      }
    })
  })
})
