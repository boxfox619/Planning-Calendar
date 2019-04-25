import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { Task } from '../../models/Task';
import { DayColumn } from './DayColumn';
import { range } from 'lodash';
import { DayOfWeekHeader } from '../DayOfWeekHeader';
import { countDaysInWeek, isMatchDate } from '../../utils/calendarUtil';
import { PRIMARY_COLOR } from '../../common/constants';

const Container = styled.div`
    text-align: center;
    padding-left: 50px;
`
const Context = styled.div`
    position: relative;
    display: flex;
`
const DateHeader = styled.div`
    display: flex;
    flex-flow: row;
    font-size: 3em;
    & > * {
        flex: 1;
    }
`
const TimeContainer = styled.div`
    position: absolute;
    left: -40px;
    top: 30px;
`

interface OwnProps {
    currentMoment: moment.Moment
    tasks: Task[]
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const WeeklyCalendar: React.FC<Props> = (props) => {
    const { currentMoment, tasks, ...divProps } = props;
    const todayMoment = moment();
    const hours = currentMoment.clone().endOf('day').hour();
    const daysInWeek = countDaysInWeek(currentMoment);
    const restWeek = currentMoment.clone().startOf('week');
    const dates = range(0, daysInWeek).map((i) => restWeek.clone().add(i, 'd'));
    const columns = dates.map(m => {
        const filteredTasks = tasks.filter(task => isMatchDate(moment.parseZone(task.date), m));
        return (<DayColumn key={m.toString()} dateMoment={m} tasks={filteredTasks}/>);
    });
    return (
        <Container {...divProps}>
            <DayOfWeekHeader />
            <DateHeader>
                {dates.map(m => (
                    <div key={m.date()} style={{color: isMatchDate(todayMoment, m) ? PRIMARY_COLOR : ''}}>{m.date()}</div>
                ))}
            </DateHeader>
            <Context>
                <TimeContainer>
                    {range(1, hours + 1).map(time => <div key={time} style={{height: '40px'}}>{time} 시</div>)}
                </TimeContainer>
                {columns}
            </Context>


        </Container>
    )
}