import { applyMiddleware, createStore, Action } from 'redux';
import { rootReducer, rootEpic } from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import { StoreModel } from '../models';

export const createReduxStore = (initialState = {}) => {
    const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, StoreModel>();
    const middleware: any[] = [epicMiddleware];

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
    epicMiddleware.run(rootEpic);
    return store
};