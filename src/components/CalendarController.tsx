import * as React from 'react';
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import { Moment } from 'moment';
import { weekOfMonth } from '../libs/weekOfMount';
import { Button } from 'antd';
import { CalendarModeDropdown } from './CalendarModeDropdown';
import 'antd/lib/button/style/css';

const Container = styled.div`
    padding: 20px;
`
const Label = styled.h3`
    display: inline;
`
Label.displayName = 'Label';

interface OwnProps {
    currentMoment: Moment,
    mode: CalendarMode,
    onChangeMode: (mode: CalendarMode) => void,
    onNext: () => void,
    onPrev: () => void
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const CalendarController: React.FC<Props> = (props: Props) => {
    const { currentMoment, mode, onChangeMode, onNext, onPrev, ...divProps } = props;

    let label = `${currentMoment.year()}년 / ${currentMoment.month() + 1}월`;
    if (mode === CalendarMode.Week) {
        label = `${label} / ${weekOfMonth(currentMoment)}주`;
    }

    return (
        <Container {...divProps}>
            <Button onClick={onPrev} shape="circle" icon="left" />
            <Button onClick={onNext} shape="circle" icon="right" />
            <Label>{label}</Label>
            <CalendarModeDropdown onChangeMode={onChangeMode} currentMode={mode} />
        </Container>
    )
}