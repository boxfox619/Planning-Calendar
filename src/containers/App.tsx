import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { CalendarController } from '../components/CalendarController';
import { CalendarMode } from '../models/CalendarMode';
import * as moment from 'moment';
import { Calendar } from './Calendar';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

interface Props {
  store: Store
}

export const App: React.FC<Props> = (props: Props) => {
  const {store} = props;

  const [currentMoment, setCurrentMoment] = React.useState(moment());
  const [calendarMode, setCalendarMode] = React.useState(CalendarMode.Month);

  return (
    <Provider store={store}>
      <Container>
        <CalendarController
          currentMoment={currentMoment}
          mode={calendarMode}
          onChangeMode={setCalendarMode}
          onChangeMoment={setCurrentMoment} />
        <Calendar
          style={{ flex: 1 }}
          currentMoment={currentMoment}
          mode={calendarMode}
        />
      </Container>
    </Provider>
  )
};