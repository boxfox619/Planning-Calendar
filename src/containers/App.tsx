import * as React from 'react';
import './App.css';
import { CalendarController } from '../components/CalendarController';
import { CalendarMode } from '../models/CalendarMode';
import * as moment from 'moment';

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
      <div className="App">
        <CalendarController
          currentMoment={this.state.currentMoment}
          mode={this.state.mode}
          onChangeMode={this.handleChangeMode}
          onNext={this.handleNext}
          onPrev={this.handlePrev} />
      </div>
    );
  }

  handleChangeMode = (mode: CalendarMode) => this.setState({ mode })

  handleNext = () => {
    alert('next');
  }

  handlePrev = () => {
    alert('prev');
  }
}

export default App;
