import * as React from 'react';
import styled from 'styled-components';
import { Task } from '../../../models/Task';
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

interface Props {
    day: number,
    tasks: Task[]
}

export const DayBox: React.FC<Props> = (props: Props) => {
    const {day, tasks} = props;
    return (
        <Day>
            {day}
            <div>
                {tasks.map(task => <TaskItem key={task.id} data-task-id={task.id}>{task.name}</TaskItem>)}
            </div>
        </Day>
    )
}