import { ACTION_HANDLERS } from './handler';
import { Task } from '../../../models/Task';
import { handleActions } from '../../../libs/redux/immutableReducer';

export class TaskStoreModel {
    constructor(
        public tasks: Task[] = [],
        public isTaskLoading: boolean = false,
        public isTaskLoaded: boolean = false,
        public isTaskUpdating: boolean = false,
        public isTaskUpdated: boolean = false
    ) { }
}

export const reducer = handleActions<TaskStoreModel>(new TaskStoreModel(), ACTION_HANDLERS);