import { ACTION_HANDLERS } from './handler';
import { TaskStore } from '../../models';
import { handleActions } from '../../utils/immutableReducer';

export const reducer = handleActions<TaskStore>(new TaskStore(), ACTION_HANDLERS);