import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Calendar } from '../Calendar';
import { CalendarMode } from '../../models/CalendarMode';
import * as moment from 'moment';
import { Task } from '../../models';

describe('<Calendar />', () => {
    const testMoment = moment.parseZone('2014-02-27T01:00:00Z');
    let component = null;
    const task = new Task(12, '이름', '2019-01-21', 3, 12);
    const tasks = [task];
    const selectMock = jest.fn();
    const updateMock = jest.fn();

    it('renders correctly', () => {
        component = Enzyme.shallow(<Calendar currentMoment={testMoment} mode={CalendarMode.Month} tasks={tasks} onSelect={selectMock} onUpdate={updateMock} />);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should open dialog', () => {
        expect(component.find('Container').length).toBe(1);
        component.find('Container').simulate('click', { target: { dataset: { taskid: task.id } } };
        expect(selectMock.mock.calls.length).toBe(1);
    });

    it('should handle dragging', () => {
        expect(component.find('Container').length).toBe(1);
        const dataTransferMock = jest.fn();
        const mockEvent = { dataTransfer: { setData: dataTransferMock }, target: { dataset: { taskid: task.id } } };
        component.find('Container').at(0).simulate('dragStart', mockEvent);
        expect(dataTransferMock.mock.calls.length).toBe(1);
        expect(dataTransferMock.mock.calls[0][0]).toBe('taskId');
        expect(dataTransferMock.mock.calls[0][1]).toBe(task.id);
    });

    it('should handle dragover', () => {
        expect(component.find('Container').length).toBe(1);
        const dataTransferMock = jest.fn();
        const mockEvent = { dataTransfer: { setData: dataTransferMock }, target: { dataset: { datetime: testMoment.toISOString() } } };
        component.find('Container').at(0).simulate('dragOver', mockEvent);
        expect(dataTransferMock.mock.calls.length).toBe(1);
        expect(dataTransferMock.mock.calls[0][0]).toBe('datetime');
        expect(dataTransferMock.mock.calls[0][1]).toBe(testMoment.toISOString());
    });

    it('should update task when drop', () => {
        expect(component.find('Container').length).toBe(1);
        const mockEvent = { dataTransfer: { getData: (key: string) => key === 'taskId' ? task.id : testMoment.toISOString() }, target: { dataset: { taskid: task.id } } };
        component.find('Container').at(0).simulate('drop', mockEvent);
        expect(updateMock.mock.calls.length).toBe(1);
        expect(updateMock.mock.calls[0][0].date).toBe('2014-02-27');
    });
});