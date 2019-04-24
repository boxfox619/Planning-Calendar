import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import {TaskItem} from '../TaskItem';
import { Task } from '../../models';
import 'antd/lib/button/style/css';

const Day = styled.div`
    text-align: left;
    padding: 10px;
`
Day.displayName = 'Day';

interface Props {
    dateMoment: moment.Moment,
    tasks: Task[]
}

export const DayBox: React.FC<Props> = (props: Props) => {
    const { dateMoment, tasks } = props;
    const sortedTask = tasks.sort((task1: Task, task2: Task) => (task1.startHour >= task2.startHour) ? 1 : -1);
    return (
        <Day data-datetime={dateMoment.format()}>
            {dateMoment.date()}
            <div>
                {sortedTask.map(task => ( <TaskItem key={task.id} taskId={task.id} name={task.name}/> ))}
            </div>
        </Day>
    )
}