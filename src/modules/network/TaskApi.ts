import { Task } from '../../models/Task';

export const loadTasks = async () => {
    return await [
        new Task(1, '귤 까기01', '2014-02-10T01:00:00.000Z', 1)
    ]
}

export const createTask = async (task: Task) => {
    return await true;
}

export const updateTask = async (task: Task) => {
    return await true;
}

export const deleteTask = async (taskId: number) => {
    return await true;
}