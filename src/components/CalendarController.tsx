import * as React from 'react';
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import * as moment from 'moment';
import { weekOfMonth, calMoment } from '../utils/calendarUtil';
import { Icon } from 'antd';
import { CalendarModeDropdown } from './CalendarModeDropdown';
import 'antd/lib/button/style/css';

const Container = styled.div`
    position: relative;
    padding: 20px;
    font-size: 1.5em;
`
const Label = styled.h3`
    display: inline;
`
const DropdownContainer = styled.div`
    position: absolute;
    right: 40px;
    right: 40px;
    top: 20px;
`
Label.displayName = 'Label';

interface OwnProps {
    currentMoment: moment.Moment,
    mode: CalendarMode,
    onChangeMode: (mode: CalendarMode) => void,
    onChangeMoment: (newMoment: moment.Moment) => void,
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const CalendarController: React.FC<Props> = (props) => {
    const { currentMoment, mode, onChangeMode, onChangeMoment, ...divProps } = props;

    let label = `${currentMoment.year()}년 / ${currentMoment.month() + 1}월`;
    if (mode === CalendarMode.Week) {
        label = `${label} / ${weekOfMonth(currentMoment)}주`;
    }

    const handleNext = () => onChangeMoment(calMoment(currentMoment, mode, 1));
    const handlePrev = () => onChangeMoment(calMoment(currentMoment, mode, -1));
    const clearMoment = () => onChangeMoment(moment());
    return (
        <Container {...divProps}>
            <Icon type="left" onClick={handlePrev} style={{ marginRight: '10px' }} />
            <Label onClick={clearMoment}>{label}</Label>
            <Icon type="right" onClick={handleNext} style={{ marginLeft: '10px' }} />
            <DropdownContainer>
                <CalendarModeDropdown onChangeMode={onChangeMode} currentMode={mode} />
            </DropdownContainer>
        </Container>
    )
}