import { applyMiddleware, createStore } from 'redux';
import { rootReducer, rootEpic } from '../../modules/reducers';
import { createEpicMiddleware } from 'redux-observable';

export const createReduxStore = (initialState = {}) => {
    const epicMiddleware = createEpicMiddleware();
    const middleware: any[] = [epicMiddleware];

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
    epicMiddleware.run(rootEpic);
    return store
};