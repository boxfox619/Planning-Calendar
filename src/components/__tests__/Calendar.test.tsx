import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Calendar } from '../Calendar';
import { CalendarMode } from '../../models/CalendarMode';
import * as moment from 'moment';

describe('<Calendar />', () => {
    const testMoment = moment.parseZone('2014-02-27T00:00:00Z');
    let component = null;
    const tasks = [];
    const mockFn = jest.fn();

    it('renders correctly', () => {
        component = Enzyme.shallow(<Calendar currentMoment={testMoment} mode={CalendarMode.Month} tasks={tasks} onSelect={mockFn} onUpdate={mockFn}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});