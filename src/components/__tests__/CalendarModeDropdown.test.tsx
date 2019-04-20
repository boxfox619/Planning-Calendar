import * as React from 'react';
import * as Enzyme from 'enzyme';
import { CalendarMode } from '../../models/CalendarMode';
import { CalendarModeDropdown } from '../CalendarModeDropdown';

describe('<CalendarModeDropdown />', () => {
    let mode = CalendarMode.Month;
    const changeModeMock = jest.fn((newMode: CalendarMode) => {mode = newMode});
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<CalendarModeDropdown currentMode={mode} onChangeMode={changeModeMock} />);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should 월', () => {
        expect(component.find('span').at(0).text()).toBe('월');
    });
});