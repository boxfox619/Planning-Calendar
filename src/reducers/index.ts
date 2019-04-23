import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducer as taskReducer } from './task';
import taskEpic from './task/epic';

export const rootReducer = combineReducers({
    task: taskReducer
});

export const rootEpic = combineEpics(
    taskEpic
);