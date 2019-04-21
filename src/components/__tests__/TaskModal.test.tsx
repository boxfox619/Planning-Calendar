import * as React from 'react';
import * as Enzyme from 'enzyme';
import { TaskModal } from '../TaskModal';
import * as moment from 'moment';
import { Task } from '../../models/Task';

describe('<TaskModal />', () => {
    let currentMoment = moment('2014-02-27T10:00:00.000Z');
    let component = null;
    const okMock = jest.fn();
    const cancelMock = jest.fn();
    const deleteMock = jest.fn();

    it('renders correctly', () => {
        component = Enzyme.shallow(<TaskModal time={currentMoment} onOk={okMock} onCancel={cancelMock} onDelete={deleteMock} />);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should modal button 2', () => {
        expect(component.find('Modal').props().footer.length).toBe(2);
    });

});

describe('<TaskModal task={task}/>', () => {
    let currentMoment = moment('2014-02-27T10:00:00.000Z');
    let component = null;
    const okMock = jest.fn();
    const cancelMock = jest.fn();
    const deleteMock = jest.fn();
    const task = new Task(1, '귤 까기01', '2014-02-10T01:00:00.000Z', 1);

    it('renders correctly', () => {
        component = Enzyme.shallow(<TaskModal task={task} time={currentMoment} onOk={okMock} onCancel={cancelMock} onDelete={deleteMock} />);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should modal button 3', () => {
        expect(component.find('Modal').props().footer.length).toBe(3);
    });

});