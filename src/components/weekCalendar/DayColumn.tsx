import * as React from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { range } from 'lodash';
import { BORDER_COLOR } from '../../common/constants';
import { Task } from '../../models/Task';
import { Button } from 'antd';
import 'antd/lib/button/style/css';

const DayColumnContainer = styled.div`
    position: relative;
    flex: 1;
    &:not(:last-child) {
        border-right: 1px solid ${BORDER_COLOR};
    }
`
const Cell = styled.div`
    height: 40px;
    cursor: pointer;
    transition-duration: 1s;
    border-bottom: 1px solid ${BORDER_COLOR};
    &:hover {
        background-color: ${BORDER_COLOR};
    }
`
const TaskItem = styled(Button)`
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
`
TaskItem.displayName = 'Task';
Cell.displayName = 'Cell';

interface Props {
    dateMoment: moment.Moment,
    tasks: Task[]
}

export const DayColumn: React.FC<Props> = (props: Props) => {
    const { dateMoment, tasks } = props;
    const hours = dateMoment.clone().endOf('day').hour();
    return (
        <DayColumnContainer>
            {range(0, hours + 1).map(time => (
                <Cell key={`${time}-cell`} data-datetime={dateMoment.clone().hour(time).toISOString()} />)
            )}
            {tasks.map(task => (
                <TaskItem key={task.id}
                    data-taskid={task.id}
                    style={{ top: `${40 * moment(task.date).hour()}px`, height: `${40 * task.durationTime}px` }}>
                    {task.name} {moment(task.date).hour()}
                </TaskItem>
            ))}
        </DayColumnContainer>
    )
}