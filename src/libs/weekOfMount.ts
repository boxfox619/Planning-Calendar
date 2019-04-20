import { Moment } from 'moment';

export const weekOfMonth = (date: Moment) => Math.ceil(date.date() / 7);