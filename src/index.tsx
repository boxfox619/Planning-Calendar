import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GlobalStyle} from './common/globalStyle';
import App from './containers/App';
import {initApi} from './api';
import {createReduxStore} from './common/store';
import registerServiceWorker from './registerServiceWorker';

initApi();
const store = createReduxStore();
ReactDOM.render(
  <>
    <GlobalStyle/>
    <App store={store}/>
  </>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
