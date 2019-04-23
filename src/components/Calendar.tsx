import * as React from 'react';
import * as moment from 'moment';
import { useState } from 'react'; 
import styled from 'styled-components';
import { CalendarMode } from '../models/CalendarMode';
import { Task, TaskCreateRequest } from '../models/Task';
import update from 'immutability-helper';
import { WeeklyCalendar } from './weekCalendar/WeeklyCalenldar';
import { MonthCalendar } from './monthCalendar/MonthCalendar';
import { TaskModal } from './TaskModal';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    padding: 0 10px;
`;

interface OwnProps {
    currentMoment: moment.Moment,
    mode: CalendarMode
}

type Props = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const Calendar: React.FC<Props> = (props: Props) => {
    const { currentMoment, mode, ...divProps } = props;
    const [tasks, setTasks] = useState(new Array<Task>());
    const [selectedMoment, setSelectedMoment] = useState();
    const [selectedTask, setSelectedTask] = useState();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const datetime = (e.target as HTMLElement).dataset.datetime;
        const taskId = (e.target as HTMLElement).dataset.taskid;
        if (datetime) {
            setSelectedMoment(moment(datetime));
        } else if (taskId) {
            setSelectedTask(tasks.find(task => task.id === Number(taskId)));
        }
    }
    const handleDismissModal = () => {
        setSelectedMoment(null);
        setSelectedTask(null);
    }
    const handleUpdateTask = (task: TaskCreateRequest) => {
        if (selectedTask) {
            const idx = tasks.findIndex(t => t.id === selectedTask.id);
            setTasks(update(tasks, { $splice: [[idx, 1, { id: selectedTask.id, ...task }]] }));
        } else {
            task.id = tasks.length;
            setTasks(update(tasks, {$push: [task]}));
        }
        handleDismissModal();
    }
    const handleDeleteTask = () => {
        const idx = tasks.findIndex(t => t.id === selectedTask.id);
        setTasks(update(tasks, {$splice: [[idx, 1]]}));
        handleDismissModal();
    }
    return (
        <Container {...divProps} onClick={handleClick}>
            {mode === CalendarMode.Month && (
                <MonthCalendar
                    style={{ flex: 1 }}
                    currentMoment={props.currentMoment}
                    tasks={tasks}
                />
            )}
            {mode === CalendarMode.Week && (
                <WeeklyCalendar
                    style={{ flex: 1 }}
                    currentMoment={props.currentMoment}
                    tasks={tasks}
                />
            )}
            {(selectedTask || selectedMoment) && (
                <TaskModal
                    task={selectedTask}
                    time={selectedMoment}
                    onOk={handleUpdateTask}
                    onCancel={handleDismissModal}
                    onDelete={handleDeleteTask} />
            )}
        </Container>
    )
}