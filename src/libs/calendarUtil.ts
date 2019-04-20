import { Moment, unitOfTime } from 'moment';
import { CalendarMode } from '../models/CalendarMode';

const momentUnit = {
    [CalendarMode.Week]: 'w',
    [CalendarMode.Month]: 'M'
}

export const weekOfMonth = (date: Moment) => Math.ceil(date.date() / 7);
export const calMoment = (moment: Moment, mode: CalendarMode, amount: number) => {
    const unit = momentUnit[mode] as unitOfTime.Base;
    if(amount > 0) {
        moment.add(amount, unit);
    }else {
        moment.subtract(Math.abs(amount), unit);
    }
    return moment;
}
export const getFirstDayOfWeek = (moment: Moment) => moment.clone().startOf('M').day();
export const getLastDayOfWeek = (moment: Moment) => moment.clone().endOf('M').day();
export const getPrevMonthDays = (moment: Moment) => moment.clone().subtract(1, 'M').daysInMonth();