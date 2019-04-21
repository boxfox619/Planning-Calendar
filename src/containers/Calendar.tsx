import * as React from 'react';
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import { Task } from '../models/Task';
import { Moment } from 'moment';
import { WeeklyCalendar } from '../components/calendar/week/WeeklyCalenldar';
import { MonthCalendar } from '../components/calendar/month/MonthCalendar';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    padding: 0 10px;
`;

interface OwnProps {
    currentMoment: Moment,
    mode: CalendarMode,
    tasks: Task[],
    onClickDate: (month: number, date: number, time?: number) => void,
    onClickTask: (taskId: number) => void
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const Calendar: React.FC<Props> = (props: Props) => {
    const { currentMoment, mode, tasks, onClickDate, onClickTask, ...divProps } = props;

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const date = (e.target as HTMLElement).dataset.date;
        const month = (e.target as HTMLElement).dataset.month;
        const time = (e.target as HTMLElement).dataset.time;
        const taskId = (e.target as HTMLElement).dataset.taskid;
        if (date && month) {
            onClickDate(Number(month), Number(date), time ? Number(time) : undefined);
        } else if (taskId) {
            onClickTask(Number(taskId));
        }
    }
    return (
        <Container {...divProps} onClick={handleClick}>
            {mode === CalendarMode.Month && (
                <MonthCalendar
                    style={{ flex: 1 }}
                    currentMoment={props.currentMoment}
                    tasks={props.tasks}
                />
            )}
            {mode === CalendarMode.Week && (
                <WeeklyCalendar
                    style={{ flex: 1 }}
                    currentMoment={props.currentMoment}
                    tasks={props.tasks}
                />
            )}
        </Container>
    )
}