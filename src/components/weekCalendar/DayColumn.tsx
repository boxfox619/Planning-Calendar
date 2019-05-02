import * as React from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { range } from 'lodash';
import { BORDER_COLOR } from '../../common/constants';
import { Task } from '../../models/Task';
import { TaskItem } from '../TaskItem';

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
const WeekTaskItem = styled(TaskItem)`
    position: absolute;
    left: 0;
    border: 1px solid gray;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
`
Cell.displayName = 'Cell';
Cell.displayName = 'TaskItem';

interface Props {
    dateMoment: moment.Moment,
    tasks: Task[]
}

export const DayColumn: React.FC<Props> = (props) => {
    const { dateMoment, tasks } = props;
    const hours = dateMoment.clone().endOf('day').hour();
    return (
        <DayColumnContainer>
            {range(0, hours + 1).map(time => (
                <Cell key={`${time}-cell`} data-datetime={dateMoment.clone().hour(time).format()} />)
            )}
            {tasks.map(task => {
                const top = `${ 40 * task.startHour }px`;
                const height = `${ 40 * (task.endHour - task.startHour) }px`;
                return (<WeekTaskItem key={task.id} style={{ top, height }} task={task}/>)
            })}
        </DayColumnContainer>
    )
}