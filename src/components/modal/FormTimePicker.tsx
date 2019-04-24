import * as React from 'react';
import styled from 'styled-components';
import {Dropdown, Menu, Button} from 'antd';
import 'antd/lib/dropdown/style/css';
import 'antd/lib/menu/style/css';
import { range } from 'lodash';
import { ClickParam } from 'antd/lib/menu';

const Label = styled.span`
    margin-left: 10px;
`

const TimePickerMenu = styled(Menu)`
    max-height: 200px;
    overflow: scroll;
`;

const TimePickerButton = styled(Button)`
    text-align: center;
    width: 40px;
    margin-left: 6px;
    padding: 0;
`

interface Props {
    name: string,
    value?: number,
    onChange?: (hour: number) => void,
    disableHours?: number[]
}

export const FormTimePicker: React.FC<Props> = ({name, value = 0, onChange, disableHours = []}) => {
    const [time, setTime] = React.useState(value);
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setTime(Number(e.target.value));
    const handleChange = (e: ClickParam) => {
        const hour = Number(e.key);
        setTime(hour);
        if(onChange) {
            onChange(hour);
        }
    }
    const timeRange = range(0, 25).filter(h => !disableHours.includes(h));
    const menu = (
        <TimePickerMenu onClick={handleChange} >
            {timeRange.map(hour => <Menu.Item key={hour}>{hour}</Menu.Item>)}
        </TimePickerMenu>
    )
    React.useEffect(() => setTime(value), [value]);
    return (
        <>
            <Label>{time > 12 ? '오후' : '오전'}</Label>
            <input name={name} type="string" hidden={true} value={time} onChange={handleTextChange} />
            <Dropdown overlay={menu} trigger={['click']}>
                <TimePickerButton>
                    {time}
                </TimePickerButton>
            </Dropdown>
        </>
    )
}