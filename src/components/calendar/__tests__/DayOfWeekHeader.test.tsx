import * as React from 'react';
import * as Enzyme from 'enzyme';
import { DayOfWeekHeader } from '../DayOfWeekHeader';

describe('<DayOfWeekHeader />', () => {
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<DayOfWeekHeader/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render days of week', () => {
        expect(component.find('div').length).toBe(7);
    });

});