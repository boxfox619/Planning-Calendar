import { TaskStoreModel } from '.';
import * as Action from './action';
import { Task } from '../../../models/Task';

export const ACTION_HANDLERS = {
    [Action.LOAD_STARTED]: (state: TaskStoreModel) => ({ isTaskLoading: { $set: true }, isTaskLoaded: { $set: false } }),
    [Action.LOAD_SUCCESSED]: (state: TaskStoreModel, payload: Task[]) => ({ tasks: { $set: payload }, isTaskLoading: { $set: false }, isTaskLoaded: { $set: true } }),
    [Action.LOAD_FAILED]: (state: TaskStoreModel) => ({ isTaskLoading: { $set: false }, isTaskLoaded: { $set: false } }),
    [Action.UPDATE_STARTED]: (state: TaskStoreModel) => ({ isTaskUpdating: { $set: true }, isTaskUpdated: { $set: false } }),
    [Action.UPDATE_FAILED]: (state: TaskStoreModel) => ({ isTaskUpdating: { $set: false }, isTaskUpdated: { $set: false } }),
    [Action.DELETE_SUCCESSED]: (state: TaskStoreModel, taskId: number) => {
        const idx = state.tasks.findIndex(task => task.id === taskId);
        return {
            isTaskUpdating: { $set: false },
            isTaskUpdated: { $set: true },
            tasks: { $splice: [[idx, 1]] }
        };
    },
    [Action.EDIT_SUCCESSED]: (state: TaskStoreModel, newTask: Task) => {
        const idx = state.tasks.findIndex(task => task.id === newTask.id);
        return {
            isTaskUpdating: { $set: false },
            isTaskUpdated: { $set: true },
            tasks: { $splice: [[idx, 1, newTask]] }
        };
    },
    [Action.CREATE_SUCCESSED]: (state: TaskStoreModel, newTask: Task) => {
        return {
            isTaskUpdating: { $set: false },
            isTaskUpdated: { $set: true },
            tasks: { $push: [newTask] }
        };
    },
}