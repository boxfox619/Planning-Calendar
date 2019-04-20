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
    const { currentMoment } = this.state;
    switch(this.state.mode){
      case CalendarMode.Month:
        currentMoment.add(1, 'M');
        break;
      case CalendarMode.Week:
        currentMoment.add(1, 'w');
        break;
    }
    this.setState({ currentMoment });
  }

  handlePrev = () => {
    const { currentMoment } = this.state;
    switch(this.state.mode){
      case CalendarMode.Month:
        currentMoment.subtract(1, 'M');
        break;
      case CalendarMode.Week:
        currentMoment.subtract(1, 'w');
        break;
    }
    this.setState({ currentMoment });
  }
}

export default App;
