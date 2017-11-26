import React from 'react';
import { connect } from 'react-redux';

import InputArea from './input-area.jsx';
import TextDisplay from './text-display.jsx';
import TextOptions from './text-options.jsx';
import Stats from './stats.jsx';

import { goToOptions } from '../core/actions/actions';

class App extends React.Component {

  renderContent = () => {
    if(this.props.startTime && !this.props.timerIsRunning) {
      return <Stats />;
    } else if(this.props.lines.length) {
      return (
        <div>
          <TextDisplay />
          <InputArea />
        </div>
      );
    } else {
      return <TextOptions />;
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lines: state.lines,
    timerIsRunning: state.timerIsRunning,
    startTime: state.startTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToOptions: () => dispatch(goToOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
