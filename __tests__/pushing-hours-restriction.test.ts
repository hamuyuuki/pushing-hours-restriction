import {currentPushableHours} from '../src/pushing-hours-restriction'
import {advanceTo, clear} from 'jest-date-mock'

describe('pushing-hours-restriction', () => {
  describe('currentPushableHours', () => {
    const startHour = 10
    const endHour = 18
    const weekdays = ['MON', 'TUE', 'WED', 'THU']

    afterEach(() => {
      clear()
    })

    describe.each([
      [
        'Monday',
        new Date(2020, 12 - 1, 7, 9, 59, 59),
        new Date(2020, 12 - 1, 7, 10, 0, 0),
        new Date(2020, 12 - 1, 7, 17, 59, 59),
        new Date(2020, 12 - 1, 7, 18, 0, 0)
      ],
      [
        'Tuesday',
        new Date(2020, 12 - 1, 8, 9, 59, 59),
        new Date(2020, 12 - 1, 8, 10, 0, 0),
        new Date(2020, 12 - 1, 8, 17, 59, 59),
        new Date(2020, 12 - 1, 8, 18, 0, 0)
      ],
      [
        'Wednesday',
        new Date(2020, 12 - 1, 9, 9, 59, 59),
        new Date(2020, 12 - 1, 9, 10, 0, 0),
        new Date(2020, 12 - 1, 9, 17, 59, 59),
        new Date(2020, 12 - 1, 9, 18, 0, 0)
      ],
      [
        'Thursday',
        new Date(2020, 12 - 1, 10, 9, 59, 59),
        new Date(2020, 12 - 1, 10, 10, 0, 0),
        new Date(2020, 12 - 1, 10, 17, 59, 59),
        new Date(2020, 12 - 1, 10, 18, 0, 0)
      ]
    ])(
      'the current day is %s',
      (
        _day,
        lessThanStartHour,
        greaterThanOrEqualToStartHour,
        lessThanEndHour,
        greaterThanOrEqualToEndHour
      ) => {
        it('should be false when the current time is less than startHour', () => {
          advanceTo(lessThanStartHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(false)
        })
        it('should be true when the current time is greater than or equal to startHour', () => {
          advanceTo(greaterThanOrEqualToStartHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(true)
        })
        it('should be true when the current time is less than endHour', () => {
          advanceTo(lessThanEndHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(true)
        })
        it('should be false when the current time is greater than or equal to endHour', () => {
          advanceTo(greaterThanOrEqualToEndHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(false)
        })
      }
    )

    describe.each([
      [
        'Friday',
        new Date(2020, 12 - 1, 11, 9, 59, 59),
        new Date(2020, 12 - 1, 11, 10, 0, 0),
        new Date(2020, 12 - 1, 11, 17, 59, 59),
        new Date(2020, 12 - 1, 11, 18, 0, 0)
      ],
      [
        'Saturday',
        new Date(2020, 12 - 1, 12, 9, 59, 59),
        new Date(2020, 12 - 1, 12, 10, 0, 0),
        new Date(2020, 12 - 1, 12, 17, 59, 59),
        new Date(2020, 12 - 1, 12, 18, 0, 0)
      ],
      [
        'Sunday',
        new Date(2020, 12 - 1, 13, 9, 59, 59),
        new Date(2020, 12 - 1, 13, 10, 0, 0),
        new Date(2020, 12 - 1, 13, 17, 59, 59),
        new Date(2020, 12 - 1, 13, 18, 0, 0)
      ]
    ])(
      'the current day is %s',
      (
        _day,
        lessThanStartHour,
        greaterThanOrEqualToStartHour,
        lessThanEndHour,
        greaterThanOrEqualToEndHour
      ) => {
        it('should be false when the current time is less than startHour', () => {
          advanceTo(lessThanStartHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(false)
        })
        it('should be false when the current time is greater than or equal to startHour', () => {
          advanceTo(greaterThanOrEqualToStartHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(false)
        })
        it('should be false when the current time is less than endHour', () => {
          advanceTo(lessThanEndHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(false)
        })
        it('should be false when the current time is greater than or equal to endHour', () => {
          advanceTo(greaterThanOrEqualToEndHour)
          expect(currentPushableHours(weekdays, startHour, endHour)).toBe(false)
        })
      }
    )
  })
})
