import * as React from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { getFirstDayOfMonth, getLastDayOfMonth, getPrevMonthDays, calMoment, isMatchDate, countDaysInWeek } from '../../utils/calendarUtil';
import { range, chunk } from 'lodash';
import { DayBox } from './DayBox';
import { CalendarMode } from '../../models/CalendarMode';
import { DayOfWeekHeader } from '../DayOfWeekHeader';
import { Task } from 'src/models';

const Container = styled.div`
    display: flex;
    flex-flow: column;
`

const RowContainer = styled.div`
    flex: 1;
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
    const todayMoment = moment();

    const createDayBox = (dayMoment: moment.Moment) => {
        const filteredTasks = tasks.filter(task => isMatchDate(moment.parseZone(task.date), dayMoment));
        const isToday = isMatchDate(todayMoment, dayMoment);
        return (<DayBox key={dayMoment.toString()} isToday={isToday} dateMoment={dayMoment} tasks={filteredTasks} />)
    };

    const prevMoment = calMoment(currentMoment, CalendarMode.Month, -1);
    const nextMoment = calMoment(currentMoment, CalendarMode.Month, 1);
    const firstDayOfMonth = getFirstDayOfMonth(currentMoment);
    const lastDayOfMonth = getLastDayOfMonth(currentMoment);
    const prevMonthOfDays = getPrevMonthDays(currentMoment) + 1;
    const currentMonthOfDays = currentMoment.daysInMonth();
    const startPrevMonthDay = prevMonthOfDays - firstDayOfMonth;
    const daysInWeek = countDaysInWeek(currentMoment);
    const prevMonthDays = range(startPrevMonthDay, prevMonthOfDays).map(day => createDayBox(prevMoment.clone().date(day)));
    const currentMonthDays = range(1, currentMonthOfDays + 1).map(day => createDayBox(currentMoment.clone().date(day)));
    const nextMonthDays = range(1, daysInWeek - lastDayOfMonth).map(day => createDayBox(nextMoment.clone().date(day)));
    const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    return (
        <Container {...divProps}>
            <DayOfWeekHeader />
            <RowContainer>
                {chunk(days, daysInWeek).map((weekDays, idx) => (
                    <Row key={idx}>
                        {weekDays}
                    </Row>
                ))}
            </RowContainer>
        </Container>

    )
}