import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import { WeeklyCalendar } from '../components/weekCalendar/WeeklyCalenldar';
import { MonthCalendar } from '../components/monthCalendar/MonthCalendar';
import { Task } from '../models';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    padding: 0 10px;
`;

interface OwnProps {
    currentMoment: moment.Moment,
    mode: CalendarMode,
    tasks: Task[],
    onSelect: (selectedMoment?: moment.Moment | Task) => void,
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const Calendar: React.FC<Props> = ({currentMoment, mode, tasks, onSelect, ...divProps}) => {

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if(target.dataset.datetime) {
            onSelect(moment(target.dataset.datetime))
        } else if(target.dataset.taskid) {
            onSelect(tasks.find(task => task.id === Number(target.dataset.taskid)));
        }
    }

    return (
        <Container {...divProps} onClick={handleClick}>
            {mode === CalendarMode.Month && (
                <MonthCalendar
                    style={{ flex: 1 }}
                    currentMoment={currentMoment}
                    tasks={tasks}
                />
            )}
            {mode === CalendarMode.Week && (
                <WeeklyCalendar
                    style={{ flex: 1 }}
                    currentMoment={currentMoment}
                    tasks={tasks}
                />
            )}
        </Container>
    )
}
