import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as moment from 'moment';
import { Task } from '../../../models/Task';
import { DayBox } from '../DayBox';

describe('<DayBox />', () => {
    const currentMoment = moment('2014-02-27T10:00:00.000Z');
    const tasks = [
        new Task(1, '귤 까기01', '2014-02-10', 0, 1),
        new Task(1, '귤 까기24', '2014-02-10', 13, 15),
        new Task(1, '귤 까기10', '2014-02-10', 5, 8),
        new Task(1, '귤 까기09', '2014-02-10', 2, 4),
        new Task(1, '귤 까기12', '2014-02-10', 9, 12),
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<DayBox dateMoment={currentMoment} tasks={tasks}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should row exists 5', () => {
        expect(component.find('Task').length).toBe(5);
        expect(component.find('Task').at(0).text()).toBe('귤 까기01');
        expect(component.find('Task').at(1).text()).toBe('귤 까기09');
        expect(component.find('Task').at(2).text()).toBe('귤 까기10');
        expect(component.find('Task').at(3).text()).toBe('귤 까기12');
        expect(component.find('Task').at(4).text()).toBe('귤 까기24');
    });

});