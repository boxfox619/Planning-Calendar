import * as React from 'react';
import * as Enzyme from 'enzyme';
import { MonthCalendar } from '../MonthCalendar';
import * as moment from 'moment';
import { Task } from '../../../../models/Task';
import { DayBox } from '../DayBox';

describe('<MonthCalendar />', () => {
    const currentMoment = moment('2014-02-27T10:00:00.000Z');
    const tasks = [
        new Task(1, '귤 까기10', '2014-02-10T10:00:00.000Z', 1, 1),
        new Task(2, '귤 까기27', '2014-02-27T10:00:00.000Z', 1, 1),
        new Task(3, '귤 까기28', '2014-02-28T10:00:00.000Z', 1, 1)
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<MonthCalendar currentMoment={currentMoment} tasks={tasks}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should row exists 5', () => {
        expect(component.find('Row').length).toBe(5);
    });

    it('should day box exists 30', () => {
        expect(component.find(DayBox).length).toBe(35);
    });

    it('should render tasks', () => {
        expect(component.find(DayBox).at(15).props().tasks.length).toBe(1); // 10
        expect(component.find(DayBox).at(32).props().tasks.length).toBe(1); // 27
        expect(component.find(DayBox).at(33).props().tasks.length).toBe(1); // 28
    })

});