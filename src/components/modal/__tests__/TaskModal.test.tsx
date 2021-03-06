import * as React from 'react';
import * as Enzyme from 'enzyme';
import { TaskModal } from '../TaskModal';
import * as moment from 'moment';
import { Task } from '../../../models/Task';

describe('<TaskModal />', () => {
    const testMoment = moment.parseZone('2014-02-27T00:00:00Z');
    let component = null;
    const okMock = jest.fn();
    const cancelMock = jest.fn();
    const deleteMock = jest.fn();

    it('renders correctly', () => {
        component = Enzyme.shallow(<TaskModal target={testMoment} onOk={okMock} onCancel={cancelMock} onDelete={deleteMock} isLoading={false}/>);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should modal props button', () => {
        expect(component.find('Modal').props().footer).toBeDefined();
    });

});

describe('<TaskModal task={task}/>', () => {
    let wrapper = null;
    const okMock = jest.fn();
    const cancelMock = jest.fn();
    const deleteMock = jest.fn();
    const task = new Task(1, '귤 까기01', '2014-02-10', 1, 3);

    it('renders correctly', () => {
        wrapper = Enzyme.shallow(<TaskModal target={task} onOk={okMock} onCancel={cancelMock} onDelete={deleteMock} isLoading={false}/>);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should modal props button', () => {
        expect(wrapper.find('Modal').props().footer).toBeDefined();
    });

});