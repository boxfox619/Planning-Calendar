import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Calendar} from '../Calendar';
import * as moment from 'moment';
import { CalendarMode } from '../../models/CalendarMode';

describe('<Calendar />', () => {
    const currentMoment = moment('2014-02-27T10:00:00.000Z');
    
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Calendar currentMoment={currentMoment} mode={CalendarMode.Month}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});