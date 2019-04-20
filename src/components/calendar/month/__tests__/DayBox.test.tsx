import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Task } from '../../../../models/Task';
import { DayBox } from '../DayBox';

describe('<DayBox />', () => {
    const tasks = [
        new Task(1, '귤 까기10', '2014-02-10T10:00:00.000Z', 1, 1),
        new Task(1, '귤 까기10', '2014-02-10T10:00:00.000Z', 10, 1)
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<DayBox month={2} date={10} tasks={tasks}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should row exists 5', () => {
        expect(component.find('Task').length).toBe(2);
        expect(component.find('Task').at(0).text()).toBe('귤 까기10');
    });

});