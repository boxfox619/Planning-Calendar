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

interface State {
  currentMoment: moment.Moment,
  mode: CalendarMode
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentMoment: moment(),
      mode: CalendarMode.Month
    }
  }
  render() {
    return (
      <Provider store={this.props.store}>
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
      </Provider>
    );
  }
  handleChangeMoment = (newMoment: moment.Moment) => this.setState({ currentMoment: newMoment });
  handleChangeMode = (mode: CalendarMode) => this.setState({ mode });
}

export default App;
