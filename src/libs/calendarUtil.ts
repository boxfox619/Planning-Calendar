import { Moment, unitOfTime } from 'moment';
import { CalendarMode } from '../models/CalendarMode';

const momentUnit = {
    [CalendarMode.Week]: 'w',
    [CalendarMode.Month]: 'M'
}

export const weekOfMonth = (date: Moment) => Math.ceil(date.date() / 7);
export const calMoment = (moment: Moment, mode: CalendarMode, amount: number) => {
    let unit = momentUnit[mode] as unitOfTime.Base;
    if(amount > 0) {
        moment.add(amount, unit);
    }else {
        moment.subtract(Math.abs(amount), unit);
    }
    return moment;
}