import { Moment, unitOfTime } from 'moment';
import { CalendarMode } from '../models';

const momentUnit = {
    [CalendarMode.Week]: 'w',
    [CalendarMode.Month]: 'M'
}

export const weekOfMonth = (date: Moment) => Math.ceil(date.date() / 7);
export const calMoment = (moment: Moment, mode: CalendarMode, amount: number) => {
    const unit = momentUnit[mode] as unitOfTime.Base;
    const newMoment = moment.clone();
    if(amount > 0) {
        newMoment.add(amount, unit);
    } else {
        newMoment.subtract(-amount, unit);
    }
    return newMoment;
}
export const countDaysInWeek = (moment: Moment) => moment.clone().endOf('week').day() + 1;
export const getFirstDayOfMonth = (moment: Moment) => moment.clone().startOf('M').day();
export const getLastDayOfMonth = (moment: Moment) => moment.clone().endOf('M').day();
export const getPrevMonthDays = (moment: Moment) => moment.clone().subtract(1, 'M').daysInMonth();
export const isMatchDate = (moment: Moment, moment2: Moment) => (moment.date() === moment2.date()) && (moment.month() === moment2.month()) && (moment.year() === moment2.year());