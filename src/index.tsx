import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './containers/App';
import {createReduxStore} from './common/store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createReduxStore();
ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
