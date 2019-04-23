import {Task} from '.';
export class TaskStore {
    constructor(
        public tasks: Task[] = [],
        public isTaskLoading: boolean = false,
        public isTaskLoaded: boolean = false,
        public isTaskUpdating: boolean = false,
        public isTaskUpdated: boolean = false,
        public error: string = ''
    ) { }
}