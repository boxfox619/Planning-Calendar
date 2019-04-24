import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Dropdown } from 'antd';
import { FormTimePicker } from '../FormTimePicker';
import { range } from 'lodash';

describe('<FormTimePicker />', () => {
    const testMoment = 10;
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<FormTimePicker name="form-name" value={testMoment} disableHours={range(0, 10)}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

});