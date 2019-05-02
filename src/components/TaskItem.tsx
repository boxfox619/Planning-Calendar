import * as React from 'react';
import styled from 'styled-components';
import {PRIMARY_COLOR} from '../common/constants';
import { Popover } from 'antd';
import 'antd/lib/popover/style/css';
import { Task } from '../models';

const TaskItemContainer = styled.div`
    width: 100%;
    height: auto;
    transition: none;
    transition: background-color 0.5s linear;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    padding: 0 2px;
    &:focus, &:hover {
        color: #fff !important;
        background-color: ${PRIMARY_COLOR} !important;
        border-color: ${PRIMARY_COLOR} !important;
    }
`

interface OwnProps {
    task: Task
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const TaskItem: React.FC<Props> = ({ task, ...divProps }) => {
    const tooltip = `${task.date} ${task.startHour}시 ~ ${task.endHour}시`;
    return (
        <Popover content={tooltip} title={task.name}>
            <TaskItemContainer {...divProps} data-taskid={task.id} draggable={true}>
                {task.name}
            </TaskItemContainer>
        </Popover>
    )
}  