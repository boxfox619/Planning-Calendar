import * as React from 'react';
import styled from 'styled-components';
import { Task } from '../../../models/Task';
import * as moment from 'moment';
import { getFirstDayOfWeek, getLastDayOfWeek, getPrevMonthDays,  calMoment, isMatchDate } from '../../../libs/calendarUtil';
import { range, chunk } from 'lodash';
import { DayBox } from './DayBox';
import { CalendarMode } from '../../../models/CalendarMode';

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    & > * {
        flex: 1;
    }
`
const Row = styled.div`
    position: relative;
    display: flex;
    border-bottom: 1px solid gray;
    & > * {
        flex: 1;
    }
    & > *:not(:last-child) {
        border-right: 1px solid gray;
    }
`
Row.displayName = 'Row';

interface OwnProps {
    currentMoment: moment.Moment
    tasks: Task[]
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const MonthCalendar: React.FC<Props> = (props: Props) => {
    const {currentMoment, tasks, ...divProps} = props;
    const prevMoment = calMoment(currentMoment, CalendarMode.Month, -1);
    const nextMoment = calMoment(currentMoment, CalendarMode.Month, 1);
    const firstDayOfWeek = getFirstDayOfWeek(currentMoment);
    const lastDayOfWeek = getLastDayOfWeek(currentMoment);
    const prevMonthOfDays = getPrevMonthDays(currentMoment);
    const currentMonthOfDays = currentMoment.daysInMonth();
    const startPrevMonthDay = prevMonthOfDays - firstDayOfWeek + 1;
    const createDay = (dayMoment: moment.Moment) => {
        const filteredTasks = tasks.filter(task => isMatchDate(moment(task.date), dayMoment));
        return (<DayBox key={`${dayMoment.month()}-${dayMoment.date()}`} day={dayMoment.date()} tasks={filteredTasks}/>)
    };
    const prevMonthDays = range(startPrevMonthDay, prevMonthOfDays + 1).map(day => createDay(prevMoment.clone().date(day)));
    const currentMonthDays = range(1, currentMonthOfDays + 1).map(day => createDay(currentMoment.clone().date(day)));
    const nextMonthDays = range(1, 7 - lastDayOfWeek).map(day => createDay(nextMoment.clone().date(day)));
    const days = Array.prototype.concat(prevMonthDays, currentMonthDays, nextMonthDays);
    return (
        <Container {...divProps}>
            {chunk(days, 7).map((weekDays, idx) => (
                <Row key={idx}>
                    {weekDays}
                </Row>
            ))}
        </Container>
    )
}