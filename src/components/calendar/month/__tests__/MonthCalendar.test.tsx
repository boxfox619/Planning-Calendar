import * as React from 'react';
import * as Enzyme from 'enzyme';
import { MonthCalendar } from '../MonthCalendar';
import * as moment from 'moment';

describe('<MonthCalendar />', () => {
    let currentMoment = moment('2014-02-27T10:00:00.000Z');
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<MonthCalendar currentMoment={currentMoment} tasks={[]}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should row exists 5', () => {
        expect(component.find('Row').length).toBe(5);
    });

    it('should day box exists 30', () => {
        expect(component.find('Day').length).toBe(35);
    });

});