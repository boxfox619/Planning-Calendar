import * as React from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { CalendarMode } from '../models/CalendarMode';
import { ClickParam } from 'antd/lib/menu';
import 'antd/lib/dropdown/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/button/style/css';

interface Props {
    currentMode: CalendarMode,
    onChangeMode: (mode: CalendarMode) => void
}

export const CalendarModeDropdown: React.FC<Props> = (props) => {
    const handleChangeMode = (e: ClickParam) => props.onChangeMode(CalendarMode[e.key]);
    const menu = (
        <Menu onClick={handleChangeMode}>
            {Object.keys(CalendarMode).map(key => (
                <Menu.Item key={key}>{CalendarMode[key]}</Menu.Item>
            ))}
        </Menu>
    )
    return (
        <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
                <span>{props.currentMode}</span> <Icon type="down" />
            </Button>
        </Dropdown>
    )
}