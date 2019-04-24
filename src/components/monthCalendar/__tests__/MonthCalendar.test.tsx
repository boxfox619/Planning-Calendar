import * as React from 'react';
import * as Enzyme from 'enzyme';
import { MonthCalendar } from '../MonthCalendar';
import * as moment from 'moment';
import { Task } from '../../../models/Task';
import { DayBox } from '../DayBox';

describe('<MonthCalendar />', () => {
    const testMoment = moment.parseZone('2014-02-27T00:00:00Z');
    const tasks = [
        new Task(1, '귤 까기10', '2014-02-10', 1, 2),
        new Task(2, '귤 까기27', '2014-02-27', 2, 3),
        new Task(3, '귤 까기28', '2014-02-28', 3, 4)
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<MonthCalendar currentMoment={testMoment} tasks={tasks}/>);
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