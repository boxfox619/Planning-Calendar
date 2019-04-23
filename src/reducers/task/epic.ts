import { Action, BaseAction } from 'redux-actions';
import { Observable, of, concat, from } from 'rxjs';
import { concatMap, map, catchError, throttleTime, timeout, takeUntil } from 'rxjs/operators';
import { ofType, combineEpics, StateObservable } from 'redux-observable';
import * as TaskAction from './action';
import * as TaskApi from '../../api/TaskApi';
import { Task, ErrorMessage } from '../../models';
import { TaskLookupRequest } from '../../models/request';
import { StoreModel } from '../../models';

const checkDuplicateTask = (tasks: Task[], task: Task) => {
    const checkRange = (t: Task, hour: number) => t.startHour < hour && t.endHour > hour;
    return !!tasks.find(t => (checkRange(t, task.startHour) || checkRange(t, task.endHour) || checkRange(task, t.startHour) || checkRange(task, t.endHour)) && task.date === t.date);
}
const duplicateError = (task: Task) => of(TaskAction.failedUpdateTask(new ErrorMessage(`해당 일시에 일정이 존재합니다`, `${task.date} ${task.startHour} ~ ${task.endHour}`)));

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
    action: Observable<BaseAction>,
    store: StateObservable<StoreModel>
): Observable<any> => action.pipe(
    ofType(TaskAction.CREATE),
    throttleTime(3000),
    concatMap(($action: Action<Task>) => {
        if(checkDuplicateTask(store.value.task.tasks, $action.payload)){
            return duplicateError($action.payload);
        }
        return concat(
            of(TaskAction.startedUpdateTask()),
            from(TaskApi.createTask($action.payload)).pipe(
                timeout(15000),
                map((task: Task) => TaskAction.successedCreateTask(task)),
                catchError(error => of(TaskAction.failedUpdateTask(error)))
            )
        )
    })
);

const updateTaskEpic = (
    action: Observable<BaseAction>,
    store: StateObservable<StoreModel>
): Observable<any> => action.pipe(
    ofType(TaskAction.EDIT),
    concatMap(($action: Action<Task>) => {
        if(checkDuplicateTask(store.value.task.tasks, $action.payload)){
            return duplicateError($action.payload);
        }
        return concat(
        of(TaskAction.startedUpdateTask()),
        from(TaskApi.updateTask($action.payload)).pipe(
            timeout(15000),
            map(() => TaskAction.successedEditTask($action.payload)),
            catchError(error => of(TaskAction.failedUpdateTask(error)))
        )
    )}
    )
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
            catchError(error => of(TaskAction.failedUpdateTask(error)))
        )
    ))
);

export default combineEpics(loadTaskEpic, createTaskEpic, updateTaskEpic, deleteTaskEpic);