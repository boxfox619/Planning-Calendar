import { Action } from 'redux';
import { Observable, of, concat, from } from 'rxjs';
import { concatMap, map, catchError, throttleTime, timeout } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import * as TaskAction from './action';
import { loadTasks } from '../../api/TaskApi';
import { Task } from '../../models/Task';

const loadTaskEpic = (
    action: Observable<Action>
): Observable<any> => {
    const observable = action.pipe(
        ofType(TaskAction.LOAD),
        throttleTime(3000),
        concatMap(($action: any) => concat(
            of({ type: TaskAction.LOAD_STARTED }),
            from(loadTasks()).pipe(
                timeout(15000),
                map((tasks: Task[]) => ({ type: TaskAction.LOAD_SUCCESSED, tasks })),
                catchError(error => of({ type: TaskAction.LOAD_FAILED, error: error.message }))
            )
        ))
    );
    return observable;
};

export default combineEpics(loadTaskEpic);