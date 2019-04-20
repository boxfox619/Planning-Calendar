import * as React from 'react';
import * as Enzyme from 'enzyme';
import { CalendarController } from '../CalendarController';
import { CalendarMode } from '../../models/CalendarMode';
import * as moment from 'moment';
import console = require('console');

describe('<CalendarController />', () => {
    const nextMock = jest.fn();
    const prevMock = jest.fn();
    const now = moment('2014-02-27T10:00:00');
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<CalendarController currentDate={now} mode={CalendarMode.Month} onNext={nextMock} onPrev={prevMock} />);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should 2014년 / 2월', () => {
        expect(component.find('h3').at(0).text()).toBe('2014년 / 2월');
    });

});