import { createAction } from 'redux-actions';
export const LOAD = 'TASK.LOAD';
export const LOAD_SUCCESSED = 'TASK.LOAD_SUCCESSED';
export const LOAD_FAILED = 'TASK.LOAD_FAILED';
export const LOAD_STARTED = 'TASK.LOAD_STARTED';

export const loadTasks = createAction(LOAD);