import { Task } from '../models/Task';
import axios from 'axios';

export const loadTasks = async (year: number, month: number) => {
    const res = await axios.get<Task[]>(`/task?year${year}&month=${month}`);
    if(res.status !== 200){
        throw new Error(res.statusText);
    }
    return res.data;
}

export const createTask = async (task: Task) => {
    const res = await axios.post<Task>(`/task`, task);
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }
    return res.data;
}

export const updateTask = async (task: Task) => {
    const res = await axios.put<string>(`/task/${task.id}`, task);
    if (res.status !== 201) {
        throw new Error(res.statusText);
    }
    return res.data;
}

export const deleteTask = async (taskId: number) => {
    const res = await axios.delete(`/task/${taskId}`);
    if (res.status !== 201) {
        throw new Error(res.statusText);
    }
    return res.data;
}