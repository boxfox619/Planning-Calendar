import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as moment from 'moment';
import { Task } from '../../../models/Task';
import { DayBox } from '../DayBox';
import { TaskItem } from '../../TaskItem';

describe('<DayBox />', () => {
    const testMoment = moment('2014-02-27T10:00:00.000Z');
    const tasks = [
        new Task(1, '귤 까기01', '2014-02-27', 0, 1),
        new Task(1, '귤 까기24', '2014-02-27', 13, 15),
        new Task(1, '귤 까기10', '2014-02-27', 5, 8),
        new Task(1, '귤 까기09', '2014-02-27', 2, 4),
        new Task(1, '귤 까기12', '2014-02-27', 9, 12),
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<DayBox dateMoment={testMoment} tasks={tasks}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should row exists 5', () => {
        expect(component.find(TaskItem).length).toBe(5);
        expect(component.find(TaskItem).at(0).props().name).toBe('귤 까기01');
        expect(component.find(TaskItem).at(1).props().name).toBe('귤 까기09');
        expect(component.find(TaskItem).at(2).props().name).toBe('귤 까기10');
        expect(component.find(TaskItem).at(3).props().name).toBe('귤 까기12');
        expect(component.find(TaskItem).at(4).props().name).toBe('귤 까기24');
    });

});