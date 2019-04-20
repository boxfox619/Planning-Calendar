import * as React from 'react';
import './App.css';
import { CalendarController } from 'src/components/CalendarController';
import { CalendarMode } from 'src/models/CalendarMode';
import * as moment from 'moment';

interface State {
  now: moment.Moment,
  mode: CalendarMode
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      now: moment(),
      mode: CalendarMode.Month
    }
  }
  render() {
    return (
      <div className="App">
        <CalendarController
          currentDate={this.state.now}
          mode={this.state.mode}
          onNext={this.handleNext}
          onPrev={this.handlePrev} />
      </div>
    );
  }

  handleNext = () => {
    alert('next');
  }

  handlePrev = () => {
    alert('prev');
  }
}

export default App;
