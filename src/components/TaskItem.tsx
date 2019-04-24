import * as React from 'react';
import styled from 'styled-components';
import { Button, Tooltip } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/tooltip/style/css';
import { Task } from '../models';

const TaskItemContainer = styled(Button)`
    width: 100%;
    height: auto;
    transition: none;
`

interface OwnProps {
    task: Task
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const TaskItem: React.FC<Props> = ({ task, ...divProps }) => {
    const tooltip = `${task.date} ${task.startHour}시 ~ ${task.endHour}시`;
    return (
        <Tooltip title={tooltip}>
            <TaskItemContainer {...divProps} data-taskid={task.id} draggable={true}>
                {task.name}
            </TaskItemContainer>
        </Tooltip>
    )
}  