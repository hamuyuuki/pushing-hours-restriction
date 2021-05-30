import {toDate} from 'date-fns-tz'
import {advanceTo, clear} from 'jest-date-mock'

import {currentPushableHours} from '../src/pushing-hours-restriction'

describe('pushing-hours-restriction', () => {
  describe('currentPushableHours', () => {
    const startHour = 10
    const endHour = 18
    const weekdays = ['MON', 'TUE', 'WED', 'THU']
    const timeZone = 'Asia/Tokyo'

    afterEach(() => {
      clear()
    })

    describe.each([
      [
        'Monday',
        toDate('2020-12-07T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-07T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-07T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-07T18:00:00', {timeZone: 'Asia/Tokyo'})
      ],
      [
        'Tuesday',
        toDate('2020-12-08T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-08T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-08T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-08T18:00:00', {timeZone: 'Asia/Tokyo'})
      ],
      [
        'Wednesday',
        toDate('2020-12-09T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-09T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-09T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-09T18:00:00', {timeZone: 'Asia/Tokyo'})
      ],
      [
        'Thursday',
        toDate('2020-12-10T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-10T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-10T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-10T18:00:00', {timeZone: 'Asia/Tokyo'})
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
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(false)
        })
        it('should be true when the current time is greater than or equal to startHour', () => {
          advanceTo(greaterThanOrEqualToStartHour)
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(true)
        })
        it('should be true when the current time is less than endHour', () => {
          advanceTo(lessThanEndHour)
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(true)
        })
        it('should be false when the current time is greater than or equal to endHour', () => {
          advanceTo(greaterThanOrEqualToEndHour)
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(false)
        })
      }
    )

    describe.each([
      [
        'Friday',
        toDate('2020-12-11T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-11T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-11T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-11T18:00:00', {timeZone: 'Asia/Tokyo'})
      ],
      [
        'Saturday',
        toDate('2020-12-12T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-12T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-12T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-12T18:00:00', {timeZone: 'Asia/Tokyo'})
      ],
      [
        'Sunday',
        toDate('2020-12-13T09:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-13T10:00:00', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-13T17:59:59', {timeZone: 'Asia/Tokyo'}),
        toDate('2020-12-13T18:00:00', {timeZone: 'Asia/Tokyo'})
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
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(false)
        })
        it('should be false when the current time is greater than or equal to startHour', () => {
          advanceTo(greaterThanOrEqualToStartHour)
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(false)
        })
        it('should be false when the current time is less than endHour', () => {
          advanceTo(lessThanEndHour)
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(false)
        })
        it('should be false when the current time is greater than or equal to endHour', () => {
          advanceTo(greaterThanOrEqualToEndHour)
          expect(
            currentPushableHours(weekdays, startHour, endHour, timeZone)
          ).toBe(false)
        })
      }
    )
  })
})
