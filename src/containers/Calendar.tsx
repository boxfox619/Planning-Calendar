import * as React from 'react';
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import { Task } from '../models/Task';
import { Moment } from 'moment';
import { MonthCalendar } from '../components/calendar/month/MonthCalendar';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    padding: 0 10px;
`;

const Header = styled.div`
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid gray;
    & > * {
        flex: 1;
    }
`

interface OwnProps {
    currentMoment: Moment,
    mode: CalendarMode,
    tasks: Task[],
    onClickDate: (month: number, date: number) => void,
    onClickTask: (taskId: number) => void
}

const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const Calendar: React.FC<Props> = (props: Props) => {
    const { currentMoment, mode, tasks, onClickDate, onClickTask, ...divProps } = props;

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const date = (e.target as HTMLElement).dataset.date;
        const month = (e.target as HTMLElement).dataset.month;
        const taskId = (e.target as HTMLElement).dataset.taskId;
        if(date && month){
            onClickDate(Number(month), Number(date));
        } else if(taskId){
            onClickTask(Number(taskId));
        }
    } 
    return (
        <Container {...divProps} onClick={handleClick}>
            <Header>
                {weekLabels.map(name => (<div key={name}>{name}</div>))}
            </Header>
            <MonthCalendar
                style={{ flex: 1 }}
                currentMoment={props.currentMoment}
                tasks={props.tasks}
                />
        </Container>
    )
}