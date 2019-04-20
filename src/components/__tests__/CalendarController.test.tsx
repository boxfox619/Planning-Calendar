import * as React from 'react';
import * as Enzyme from 'enzyme';
import { CalendarController } from '../CalendarController';
import { CalendarMode } from '../../models/CalendarMode';
import * as moment from 'moment';

describe('<CalendarController />', () => {
    const nextMock = jest.fn();
    const prevMock = jest.fn();
    const changeMode = jest.fn();
    const now = moment('2014-02-27T10:00:00.000Z');
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<CalendarController currentMoment={now} mode={CalendarMode.Month} onChangeMode={changeMode} onNext={nextMock} onPrev={prevMock} />);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should 2014년 / 2월', () => {
        expect(component.find('Label').at(0).text()).toBe('2014년 / 2월');
    });

    it('should calls functions', () => {
        const buttons = component.find('Button');
        buttons.at(0).simulate('click');
        buttons.at(1).simulate('click');
        expect(prevMock.mock.calls.length).toBe(1);
        expect(nextMock.mock.calls.length).toBe(1);
    });
});