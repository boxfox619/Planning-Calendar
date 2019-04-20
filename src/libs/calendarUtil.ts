import { Moment, unitOfTime } from 'moment';
import { CalendarMode } from '../models/CalendarMode';

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
export const compareMoment = (moment1: Moment, moment2: Moment) => {
    if (moment1 > moment2) return 1;
    else if (moment1 < moment2) return -1;
    else return 0;
}
export const getFirstDayOfWeek = (moment: Moment) => moment.clone().startOf('M').day();
export const getLastDayOfWeek = (moment: Moment) => moment.clone().endOf('M').day();
export const getPrevMonthDays = (moment: Moment) => moment.clone().subtract(1, 'M').daysInMonth();
export const isMatchDate = (moment: Moment, moment2: Moment) => moment.date() === moment2.date() && moment.month() === moment2.month() && moment.year() && moment2.year();