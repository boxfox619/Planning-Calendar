import { TaskStore } from '../../models';
import * as Action from './action';
import { Task, ErrorMessage } from '../../models';

export const ACTION_HANDLERS = {
    [Action.LOAD_STARTED]: (state: TaskStore) => ({ tasks: { $set: [] },isTaskLoading: { $set: true }, isTaskLoaded: { $set: false } }),
    [Action.LOAD_SUCCESSED]: (state: TaskStore, payload: Task[]) => ({ tasks: { $set: payload }, isTaskLoading: { $set: false }, isTaskLoaded: { $set: true } }),
    [Action.LOAD_FAILED]: (state: TaskStore, error: ErrorMessage) => ({ isTaskLoading: { $set: false }, isTaskLoaded: { $set: false }, error: {$set: error} }),
    [Action.UPDATE_STARTED]: (state: TaskStore) => ({ isTaskUpdating: { $set: true }, isTaskUpdated: { $set: false } }),
    [Action.UPDATE_FAILED]: (state: TaskStore, error: ErrorMessage) => ({ isTaskUpdating: { $set: false }, isTaskUpdated: { $set: false }, error: {$set: error} }),
    [Action.DELETE_SUCCESSED]: (state: TaskStore, taskId: number) => {
        const idx = state.tasks.findIndex(task => task.id === taskId);
        return {
            isTaskUpdating: { $set: false },
            isTaskUpdated: { $set: true },
            tasks: { $splice: [[idx, 1]] }
        };
    },
    [Action.EDIT_SUCCESSED]: (state: TaskStore, newTask: Task) => {
        const idx = state.tasks.findIndex(task => task.id === newTask.id);
        return {
            isTaskUpdating: { $set: false },
            isTaskUpdated: { $set: true },
            tasks: { $splice: [[idx, 1, newTask]] }
        };
    },
    [Action.CREATE_SUCCESSED]: (state: TaskStore, newTask: Task) => {
        return {
            isTaskUpdating: { $set: false },
            isTaskUpdated: { $set: true },
            tasks: { $push: [newTask] }
        };
    },
}