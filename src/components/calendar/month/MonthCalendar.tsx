import * as React from 'react';
import styled from 'styled-components';
import { Task } from '../../../models/Task';
import { Moment } from 'moment';
import { getFirstDayOfWeek, getLastDayOfWeek, getPrevMonthDays } from '../../../libs/calendarUtil';
import { range, chunk } from 'lodash';
import { CalendarDay } from './CalendarDay';

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
const Day = styled.div`
    text-align: left;
    padding: 10px;
`
Day.displayName = 'Day'

interface OwnProps {
    currentMoment: Moment
    tasks: Task[]
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const MonthCalendar: React.FC<Props> = (props: Props) => {
    const {currentMoment, tasks, ...divProps} = props;
    const firstDayOfWeek = getFirstDayOfWeek(currentMoment);
    const lastDayOfWeek = getLastDayOfWeek(currentMoment);
    const prevMonthOfDays = getPrevMonthDays(currentMoment);
    const currentMonthOfDays = currentMoment.daysInMonth();
    const startPrevMonthDay = prevMonthOfDays - firstDayOfWeek + 1;
    const prevMonthDays = range(startPrevMonthDay, prevMonthOfDays + 1).map(d => <Day key={`prev-${d}`}>{d}</Day>);
    const currentMonthDays = range(1, currentMonthOfDays + 1).map(d => <Day key={`current-${d}`}>{d}</Day>);
    const nextMonthDays = range(1, 7 - lastDayOfWeek).map(d => <Day key={`next-${d}`}>{d}</Day>);
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