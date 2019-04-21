import { TaskStoreModel } from '.';
import * as Action from './action';

export const ACTION_HANDLERS = {
    [Action.LOAD_STARTED] : (state: TaskStoreModel, action: any) => ({isTaskLoading: {$set: true}, isTaskLoaded: {$set: false}}),
    [Action.LOAD_SUCCESSED] : (state: TaskStoreModel, action: any) => ({tasks: {$set: action.tasks}, isTaskLoading: {$set: false}, isTaskLoaded: {$set: true}}),
    [Action.LOAD_FAILED] : (state: TaskStoreModel, action: any) => ({isTaskLoading: {$set: false}, isTaskLoaded: {$set: false}}),
}
