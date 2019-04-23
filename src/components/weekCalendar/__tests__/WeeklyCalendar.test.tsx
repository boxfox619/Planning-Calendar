import * as React from 'react';
import * as Enzyme from 'enzyme';
import { WeeklyCalendar } from '../WeeklyCalenldar';
import * as moment from 'moment';
import { Task } from '../../../models/Task';
import { DayColumn } from '../DayColumn';
import { getDaysInWeek } from '../../../utils/calendarUtil';

describe('<WeeklyCalendar />', () => {
    const currentMoment = moment('2014-02-27T10:00:00.000Z');
    const daysInWeek = getDaysInWeek(currentMoment);
    const tasks = [
        new Task(1, '귤 까기10', '2014-02-10T10:00:00.000Z', 1),
        new Task(2, '귤 까기27', '2014-02-27T10:00:00.000Z', 1),
        new Task(3, '귤 까기28', '2014-02-28T10:00:00.000Z', 1)
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<WeeklyCalendar currentMoment={currentMoment} tasks={tasks}/>);
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