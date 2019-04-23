import * as Action from '../task/action';
import {reducer} from '../task';
import { Task } from '../../models/Task';

describe('counter', () => {
  const task = new Task(1, 'name', '2019-12-12', 1, 2);
  const newTask = new Task(1, 'name2', '2019-12-13', 1, 3);
  const loadTaskReq = {year: 2019, month: 12};
    describe('actions', () => {
      it('should create actions', () => {
        const expectedActions =[
          { type: Action.LOAD, payload: {year: 2019, month: 12} },
          { type: Action.LOAD_STARTED },
          { type: Action.LOAD_FAILED },
          { type: Action.LOAD_SUCCESSED, payload: [task] },
          { type: Action.CREATE, payload: newTask },
          { type: Action.EDIT, payload: newTask },
          { type: Action.DELETE, payload: task.id },
          { type: Action.UPDATE_STARTED },
          { type: Action.UPDATE_FAILED },
          { type: Action.CREATE_SUCCESSED, payload: newTask },
          { type: Action.EDIT_SUCCESSED, payload: newTask },
          { type: Action.DELETE_SUCCESSED, payload: task.id },
        ];
        const actions = [
          Action.loadTasks(loadTaskReq),
          Action.startedLoadTasks(),
          Action.failedLoadTasks(),
          Action.successedLoadTasks([task]),
          Action.createTask(newTask),
          Action.editTask(newTask),
          Action.deleteTask(task.id),
          Action.startedUpdateTask(),
          Action.failedUpdateTask(),
          Action.successedCreateTask(newTask),
          Action.successedEditTask(newTask),
          Action.successedDeleteTask(task.id)
        ];
        expect(actions).toEqual(expectedActions);
      });
    });
    describe('reducer', () => {
      let state = reducer(undefined, Action.loadTasks(loadTaskReq));
      it('should return the initialState', () => {
        expect(state).toHaveProperty('tasks', []);
      });
  
      it('should loading = true, loaded = false', () => {
        state = reducer(state, Action.startedLoadTasks());
        expect(state).toHaveProperty('isTaskLoading', true);
        expect(state).toHaveProperty('isTaskLoaded', false);
      });
  
      it('should loading = false, loaded = false', () => {
        state = reducer(state, Action.failedLoadTasks());
        expect(state).toHaveProperty('isTaskLoading', false);
        expect(state).toHaveProperty('isTaskLoaded', false);
      });
  
      it('should loading = false, lodaed = true, tasks = [Task]', () => {
        state = reducer(state, Action.successedLoadTasks([task]));
        expect(state).toHaveProperty('isTaskLoading', false);
        expect(state).toHaveProperty('isTaskLoaded', true);
        expect(state).toHaveProperty('tasks', [task]);
      });
  
      it('should updating = true, updated = false', () => {
        state = reducer(state, Action.startedUpdateTask());
        expect(state).toHaveProperty('isTaskUpdating', true);
        expect(state).toHaveProperty('isTaskUpdated', false);
        expect(state).toHaveProperty('tasks', [task]);
      });

      it('should updating = false, updated = false', () => {
        state = reducer(state, Action.failedUpdateTask());
        expect(state).toHaveProperty('isTaskUpdating', false);
        expect(state).toHaveProperty('isTaskUpdated', false);
        expect(state).toHaveProperty('tasks', [task]);
      });

      it('should updating = false, updated = true, tasks updated', () => {
        state = reducer(state, Action.successedEditTask(newTask));
        expect(state).toHaveProperty('isTaskUpdating', false);
        expect(state).toHaveProperty('isTaskUpdated', true);
        expect(state).toHaveProperty('tasks', [newTask]);
      });

      it('should updating = false, updated = true, tasks updated', () => {
        state = reducer(state, Action.successedDeleteTask(newTask.id));
        expect(state).toHaveProperty('isTaskUpdating', false);
        expect(state).toHaveProperty('isTaskUpdated', true);
        expect(state).toHaveProperty('tasks', []);
      });

      it('should updating = false, updated = true, tasks updated', () => {
        state = reducer(state, Action.successedCreateTask(newTask));
        expect(state).toHaveProperty('isTaskUpdating', false);
        expect(state).toHaveProperty('isTaskUpdated', true);
        expect(state).toHaveProperty('tasks', [newTask]);
      });
    })
  });