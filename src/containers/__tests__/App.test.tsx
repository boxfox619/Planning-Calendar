import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as ReactDOM from 'react-dom';
import App from '../App';

describe('<SlideCreateCard />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot', () => {
    const wrapper = Enzyme.shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});