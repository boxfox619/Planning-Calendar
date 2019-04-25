import * as calendarUtil from '../calendarUtil';
import * as moment from 'moment';
import { CalendarMode } from '../../models';

describe('calendar util', () => {
    const testMoment = moment.parseZone('2014-02-27T00:00:00Z');

    it('week number of month : 4', () => {
        const weekOfMonth = calendarUtil.weekOfMonth(testMoment);
        expect(weekOfMonth).toBe(4);
    });

    it('to match month, week calcuation', () => {
        const nextMonth = calendarUtil.calMoment(testMoment, CalendarMode.Month, 1);
        const prevMonth = calendarUtil.calMoment(testMoment, CalendarMode.Month, -2);
        const nextWeek = calendarUtil.calMoment(testMoment, CalendarMode.Week, 1);
        const prevWeek = calendarUtil.calMoment(testMoment, CalendarMode.Week, -2);
        expect(nextMonth.format()).toBe('2014-03-27T00:00:00Z');
        expect(prevMonth.format()).toBe('2013-12-27T00:00:00Z');
        expect(nextWeek.format()).toBe('2014-03-06T00:00:00Z');
        expect(prevWeek.format()).toBe('2014-02-13T00:00:00Z');
    });

    it('to match day count of week : 7', () => {
        const dayCount = calendarUtil.countDaysInWeek(testMoment);
        expect(dayCount).toBe(7);
    });

    it('to match first day of month', () => {
        const firstDayOfMonth = calendarUtil.getFirstDayOfMonth(testMoment);
        const firstDayOfMonth2 = calendarUtil.getFirstDayOfMonth(calendarUtil.calMoment(testMoment, CalendarMode.Month, 2));
        expect(firstDayOfMonth).toBe(6);
        expect(firstDayOfMonth2).toBe(2);
    });

    it('to match last day of month', () => {
        const lastDayOfMonth = calendarUtil.getLastDayOfMonth(testMoment);
        const lastDayOfMonth2 = calendarUtil.getLastDayOfMonth(calendarUtil.calMoment(testMoment, CalendarMode.Month, 2));
        expect(lastDayOfMonth).toBe(5);
        expect(lastDayOfMonth2).toBe(3);
    });

    it('to match count previous month date count', () => {
        const daysOfMonth = calendarUtil.getPrevMonthDays(testMoment);
        const daysOfMonth2 = calendarUtil.getPrevMonthDays(calendarUtil.calMoment(testMoment, CalendarMode.Month, 1));
        expect(daysOfMonth).toBe(31);
        expect(daysOfMonth2).toBe(28);
    });

    it('compare two moments', () => {
        const compare1 = calendarUtil.isMatchDate(testMoment, testMoment.clone());
        const compare2 = calendarUtil.isMatchDate(testMoment, calendarUtil.calMoment(testMoment, CalendarMode.Month, 1));
        const compare3 = calendarUtil.isMatchDate(testMoment, calendarUtil.calMoment(testMoment, CalendarMode.Month, -2));
        expect(compare1).toBeTruthy();
        expect(!compare2).toBeTruthy();
        expect(!compare3).toBeTruthy();
    });
});