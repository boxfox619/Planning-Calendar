import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Task } from '../../../../models/Task';
import { DayColumn } from '../DayColumn';
import * as moment from 'moment';

describe('<DayColumn />', () => {
    const dateMoment = moment('2014-02-27T10:00:00.000Z');
    const hours = dateMoment.clone().endOf('day').hour() +1;
    const tasks = [
        new Task(1, '귤 까기01', '2014-02-10T01:00:00.000Z', 1),
        new Task(1, '귤 까기24', '2014-02-10T24:00:00.000Z', 10),
        new Task(1, '귤 까기10', '2014-02-10T10:00:00.000Z', 2),
        new Task(1, '귤 까기09', '2014-02-10T09:00:00.000Z', 3),
        new Task(1, '귤 까기12', '2014-02-10T12:00:00.000Z', 4),
    ];
    let component = null;


    it('renders correctly', () => {
        component = Enzyme.shallow(<DayColumn dateMoment={dateMoment} tasks={tasks}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it(`should cell render ${hours}`, () => {
        expect(component.find('Cell').length).toBe(hours);
    })
    
    it('should Task render 5', () => {
        expect(component.find('Task').length).toBe(5);
    });

});