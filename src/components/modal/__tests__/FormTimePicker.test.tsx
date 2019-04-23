import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as moment from 'moment';
import { TimePicker } from 'antd';
import { FormTimePicker } from '../FormTimePicker';

describe('<FormTimePicker />', () => {
    const currentMoment = moment('2014-02-27T10:00:00.000Z');
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<FormTimePicker name="form-name" defaultValue={currentMoment}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render input, TimePicker', () => {
        expect(component.find('input').length).toBe(1);
        expect(component.find('input').props().name).toBe("form-name");
        expect(component.find(TimePicker).length).toBe(1);
    });

});