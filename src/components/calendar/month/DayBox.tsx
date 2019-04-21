import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { Task } from '../../../models/Task';
import { compareMoment } from '../../../libs/calendarUtil';
import { Button } from 'antd';
import 'antd/lib/button/style/css';

const Day = styled.div`
    text-align: left;
    padding: 10px;
`
const TaskItem = styled(Button)`
    width: 100%;
    height: auto;
`
Day.displayName = 'Day';
TaskItem.displayName = 'Task';

interface Props {
    month: number,
    date: number,
    tasks: Task[]
}

export const DayBox: React.FC<Props> = (props: Props) => {
    const {date, month, tasks} = props;
    const sortedTask = tasks.sort((task1: Task, task2: Task) => compareMoment(moment(task1.date), moment(task2.date)));
    return (
        <Day data-date={date} data-month={month}>
            {date}
            <div>
                {sortedTask.map(task => <TaskItem key={task.id} data-taskid={task.id}>{task.name}</TaskItem>)}
            </div>
        </Day>
    )
}