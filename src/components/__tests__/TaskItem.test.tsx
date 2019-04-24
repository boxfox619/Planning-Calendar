import * as React from 'react';
import * as Enzyme from 'enzyme';
import { TaskItem } from '../TaskItem';
import { Task } from '../../models';

describe('<TaskItem />', () => {
    let component = null;
    const task = new Task(1, '이름', '2019-10-11', 2, 3);

    it('renders correctly', () => {
        component = Enzyme.shallow(<TaskItem task={task}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});