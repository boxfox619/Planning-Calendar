import { TaskStoreModel } from '.';
import * as Action from './action';
import { Task } from '../../../models/Task';

export const ACTION_HANDLERS = {
    [Action.LOAD_STARTED] : (state: TaskStoreModel) => ({isTaskLoading: {$set: true}, isTaskLoaded: {$set: false}}),
    [Action.LOAD_SUCCESSED] : (state: TaskStoreModel, payload: Task[]) => ({tasks: {$set: payload}, isTaskLoading: {$set: false}, isTaskLoaded: {$set: true}}),
    [Action.LOAD_FAILED] : (state: TaskStoreModel) => ({isTaskLoading: {$set: false}, isTaskLoaded: {$set: false}}),
}