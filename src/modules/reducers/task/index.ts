import update from 'immutability-helper';
import { ACTION_HANDLERS } from './handler';
import { Task } from '../../../models/Task';

export const reducer = (state: TaskStoreModel = new TaskStoreModel(), action: any) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? update(state, handler(state, action)) : state
}


export class TaskStoreModel {
    constructor(
        public promotions: Task[] = [],
        public isTaskLoading: boolean = false,
        public isTaskLoaded: boolean = false,
    ) { }
}