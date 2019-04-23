import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createReduxStore } from '../../common/store';
import App from '../App';

describe('<App />', () => {
  const store = createReduxStore();
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App store={store}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});