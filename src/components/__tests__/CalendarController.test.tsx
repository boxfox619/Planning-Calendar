import * as React from 'react';
import * as Enzyme from 'enzyme';
import { CalendarController } from '../CalendarController';
import { CalendarMode } from '../../models/CalendarMode';
import * as moment from 'moment';

describe('<CalendarController />', () => {
    const testMoment = moment.parseZone('2014-02-27T00:00:00Z');
    let component = null;
    const changeMode = jest.fn();
    const changeMoment = jest.fn();

    it('renders correctly', () => {
        component = Enzyme.shallow(<CalendarController currentMoment={testMoment} mode={CalendarMode.Month} onChangeMode={changeMode} onChangeMoment={changeMoment} />);
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
        expect(changeMoment.mock.calls.length).toBe(2);
        expect(changeMoment.mock.calls[0][0].format()).toBe('2014-01-27T00:00:00.000Z');
        expect(changeMoment.mock.calls[1][0].format()).toBe('2014-03-27T00:00:00.000Z');
    });
});