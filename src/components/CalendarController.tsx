import * as React from 'react';
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import { Moment } from 'moment';
import { weekOfMonth, calMoment } from '../utils/calendarUtil';
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
    onChangeMoment: (newMoment: Moment) => void,
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const CalendarController: React.FC<Props> = (props: Props) => {
    const { currentMoment, mode, onChangeMode, onChangeMoment, ...divProps } = props;

    let label = `${currentMoment.year()}년 / ${currentMoment.month() + 1}월`;
    if (mode === CalendarMode.Week) {
        label = `${label} / ${weekOfMonth(currentMoment)}주`;
    }

    const handleNext = () => onChangeMoment(calMoment(currentMoment, mode, 1));
    const handlePrev = () => onChangeMoment(calMoment(currentMoment, mode, -1));

    return (
        <Container {...divProps}>
            <Button onClick={handlePrev} shape="circle" icon="left" />
            <Button onClick={handleNext} shape="circle" icon="right" />
            <Label>{label}</Label>
            <CalendarModeDropdown onChangeMode={onChangeMode} currentMode={mode} />
        </Container>
    )
}