import { Action, BaseAction } from 'redux-actions';
import { Observable, of, concat, from } from 'rxjs';
import { concatMap, map, catchError, throttleTime, timeout, takeUntil } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import * as TaskAction from './action';
import * as TaskApi from '../../api/TaskApi';
import { Task } from '../../models/Task';
import { TaskLookupRequest } from '../../models/request';

const loadTaskEpic = (
    action: Observable<BaseAction>
): Observable<any> => action.pipe(
    ofType(TaskAction.LOAD),
    concatMap(($action: Action<TaskLookupRequest>) => concat(
        of(TaskAction.startedLoadTasks()),
        from(TaskApi.loadTasks($action.payload.year, $action.payload.month)).pipe(
            timeout(15000),
            map((tasks: Task[]) => TaskAction.successedLoadTasks(tasks)),
            catchError((err: Error) => of(TaskAction.failedLoadTasks())),
            takeUntil(action.pipe(ofType(TaskAction.LOAD)))
            )
        )
    )
);

const createTaskEpic = (
    action: Observable<BaseAction>
): Observable<any> => action.pipe(
    ofType(TaskAction.CREATE),
    throttleTime(3000),
    concatMap(($action: Action<Task>) => concat(
        of(TaskAction.startedUpdateTask()),
        from(TaskApi.createTask($action.payload)).pipe(
            timeout(15000),
            map((task: Task) => TaskAction.successedCreateTask(task)),
            catchError(error => of(TaskAction.failedUpdateTask()))
        )
    ))
);

const updateTaskEpic = (
    action: Observable<BaseAction>
): Observable<any> => action.pipe(
    ofType(TaskAction.EDIT),
    concatMap(($action: Action<Task>) => concat(
        of(TaskAction.startedUpdateTask()),
        from(TaskApi.updateTask($action.payload)).pipe(
            timeout(15000),
            map(() => TaskAction.successedEditTask($action.payload)),
            catchError(error => of(TaskAction.failedUpdateTask()))
        )
    ))
);

const deleteTaskEpic = (
    action: Observable<BaseAction>
): Observable<any> => action.pipe(
    ofType(TaskAction.DELETE),
    concatMap(($action: Action<number>) => concat(
        of(TaskAction.startedUpdateTask()),
        from(TaskApi.deleteTask($action.payload)).pipe(
            timeout(15000),
            map(() => TaskAction.successedDeleteTask($action.payload)),
            catchError(error => of(TaskAction.failedUpdateTask()))
        )
    ))
);

export default combineEpics(loadTaskEpic, createTaskEpic, updateTaskEpic, deleteTaskEpic);