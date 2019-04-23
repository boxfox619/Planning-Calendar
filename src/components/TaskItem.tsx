import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import 'antd/lib/button/style/css';

const TaskItemContainer = styled(Button)`
    width: 100%;
    height: auto;
    transition: none;
`

interface OwnProps {
    taskId: number,
    name: string
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const TaskItem: React.FC<Props> = ({taskId, name, ...divProps}) => {
    return (
        <TaskItemContainer {...divProps} data-taskid={taskId} draggable={true}>
            {name}
        </TaskItemContainer>
    )
}  