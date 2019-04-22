import { createAction } from 'redux-actions';
import { Task } from '../../models';

export const LOAD = 'TASK.LOAD';
export const LOAD_STARTED = 'TASK.LOAD_STARTED';
export const LOAD_SUCCESSED = 'TASK.LOAD_SUCCESSED';
export const LOAD_FAILED = 'TASK.LOAD_FAILED';
export const DELETE = 'TASK.DELETE';
export const EDIT = 'TASK.EDIT';
export const CREATE = 'TASK.CREATE';
export const UPDATE_STARTED = 'TASK.EDIT_STARTED';
export const UPDATE_FAILED = 'TASK.EDIT_FAILED';
export const DELETE_SUCCESSED = 'TASK.DELETE_SUCCESSED';
export const EDIT_SUCCESSED = 'TASK.EDIT_SUCCESSED';
export const CREATE_SUCCESSED = 'TASK.CREATE_SUCCESSED';

export const loadTasks = createAction(LOAD);
export const startedLoadTasks = createAction(LOAD_STARTED);
export const successdLoadTasks = createAction<Task[]>(LOAD_SUCCESSED);
export const failedLoadTasks = createAction(LOAD_FAILED);
export const createTask = createAction<Task>(CREATE);
export const editTask = createAction<Task>(EDIT);
export const deleteTask = createAction<number>(DELETE);
export const failedUpdateTask = createAction(UPDATE_FAILED);
export const startedUpdateTask = createAction(UPDATE_STARTED);
export const successedDeleteTask = createAction<number>(DELETE_SUCCESSED);
export const successedEditTask = createAction<Task>(EDIT_SUCCESSED);
export const successedCreateTask = createAction<Task>(CREATE_SUCCESSED);