import * as React from 'react';
import * as Enzyme from 'enzyme';
import { TaskItem } from '../TaskItem';

describe('<TaskItem />', () => {
    let component = null;

    it('renders correctly', () => {
        component = Enzyme.shallow(<TaskItem taskId={123} name="일정 테스트"/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render days of week', () => {
        expect(component.text()).toBe('일정 테스트');
    });

});