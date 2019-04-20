import * as React from 'react';
import styled from 'styled-components';
import { CalendarMode } from 'src/models/CalendarMode';
import { Moment } from 'moment';

const Container = styled.div`
    padding: 20px;
`
const Button = styled.span`
    margin: 0 10px;
    font-size: 2em;
    cursor: pointer;
`

interface OwnProps {
    currentDate: Moment,
    mode: CalendarMode,
    onNext: () => void,
    onPrev: () => void
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const CalendarController: React.FC<Props> = (props: Props) => {
    const { currentDate, mode, onNext, onPrev, ...divProps } = props;
    return (
        <Container {...divProps}>
            <Button onClick={onPrev}>{'<'}</Button>
            <Button onClick={onNext}>{'>'}</Button>
            <h3>{currentDate.year()}년 / {currentDate.month()+1}월</h3>
        </Container>
    )
}