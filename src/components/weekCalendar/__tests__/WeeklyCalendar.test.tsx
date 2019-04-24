import * as React from 'react';
import * as Enzyme from 'enzyme';
import { WeeklyCalendar } from '../WeeklyCalenldar';
import * as moment from 'moment';
import { Task } from '../../../models/Task';
import { DayColumn } from '../DayColumn';
import { countDaysInWeek } from '../../../utils/calendarUtil';

describe('<WeeklyCalendar />', () => {
    const testMoment = moment.parseZone('2014-02-27T00:00:00Z');
    const daysInWeek = countDaysInWeek(testMoment);
    const tasks = [
        new Task(1, '귤 까기10', '2014-02-10', 2, 4),
        new Task(2, '귤 까기27', '2014-02-27', 5, 3),
        new Task(3, '귤 까기28', '2014-02-28', 1, 2)
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<WeeklyCalendar currentMoment={testMoment} tasks={tasks}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it(`should render DayColumn ${daysInWeek}`, () => {
        expect(component.find(DayColumn).length).toBe(daysInWeek);
    });

    it('should render tasks', () => {
        expect(component.find(DayColumn).at(4).props().tasks.length).toBe(1); // 27
    })

});