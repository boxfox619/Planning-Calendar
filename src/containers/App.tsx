import * as React from 'react';
import './App.css';
import { CalendarController } from '../components/CalendarController';
import { CalendarMode } from '../models/CalendarMode';
import * as moment from 'moment';
import { Calendar } from './Calendar';
import styled from 'styled-components';
import { Task } from '../models/Task';

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

interface State {
  currentMoment: moment.Moment,
  mode: CalendarMode,
  tasks: Task[]
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentMoment: moment(),
      mode: CalendarMode.Month,
      tasks: []
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
          style={{flex: 1}}
          currentMoment={this.state.currentMoment}
          mode={this.state.mode}
          tasks={this.state.tasks}
          onClickTask={this.handleClickTask}
          onClickDate={this.handleClickDate}
        />
      </Container>
    );
  }
  handleChangeMoment = (newMoment: moment.Moment) => this.setState({ currentMoment: newMoment });
  handleChangeMode = (mode: CalendarMode) => this.setState({ mode });
  handleClickTask = (taskId: number) => {alert(taskId)}; 
  handleClickDate = (month: number, date: number) => {alert(date)};
}

export default App;
