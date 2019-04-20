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
    tasks: Task[]
}

const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const Calendar: React.FC<Props> = (props: Props) => {
    const { currentMoment, mode, tasks, ...divProps } = props;
    return (
        <Container {...divProps}>
            <Header>
                {weekLabels.map(name => (<div key={name}>{name}</div>))}
            </Header>
            <MonthCalendar style={{ flex: 1 }} currentMoment={props.currentMoment} tasks={props.tasks} />
        </Container>
    )
}