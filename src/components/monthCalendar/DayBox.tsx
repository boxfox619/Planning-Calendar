import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import {PRIMARY_COLOR} from '../../common/constants';
import {TaskItem} from '../TaskItem';
import { Task } from '../../models';
import 'antd/lib/button/style/css';

const Day = styled.div`
    text-align: left;
    padding: 10px;
    min-width: 0px;
`
const DayLabel = styled.span`
    display: inline-block;
    ${(props: {active: boolean}) => props.active && `
        padding: 0px 6px;
        background-color: ${PRIMARY_COLOR};
        color: #fff;
        border-radius: 100%;
        margin-bottom: 5px;
    `}
`
Day.displayName = 'Day';

interface Props {
    dateMoment: moment.Moment,
    tasks: Task[],
    isToday: boolean;
}

export const DayBox: React.FC<Props> = (props: Props) => {
    const { dateMoment, tasks } = props;
    const sortedTask = tasks.sort((task1: Task, task2: Task) => (task1.startHour >= task2.startHour) ? 1 : -1);
    return (
        <Day data-datetime={dateMoment.format()}>
            <DayLabel active={props.isToday}>{dateMoment.date()}</DayLabel>
            <div>
                {sortedTask.map(task => ( <TaskItem key={task.id} task={task}/> ))}
            </div>
        </Day>
    )
}