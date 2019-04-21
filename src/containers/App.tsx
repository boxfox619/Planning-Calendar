import * as React from 'react';
import './App.css';
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

interface State {
  currentMoment: moment.Moment,
  mode: CalendarMode
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentMoment: moment(),
      mode: CalendarMode.Month
    }
  }
  render() {
    return (
      <Container>
        <CalendarController
          currentMoment={this.state.currentMoment}
          mode={this.state.mode}
          onChangeMode={this.handleChangeMode}
          onChangeMoment={this.handleChangeMoment} />
        <Calendar
          style={{ flex: 1 }}
          currentMoment={this.state.currentMoment}
          mode={this.state.mode}
        />
      </Container>
    );
  }
  handleChangeMoment = (newMoment: moment.Moment) => this.setState({ currentMoment: newMoment });
  handleChangeMode = (mode: CalendarMode) => this.setState({ mode });
}

export default App;
