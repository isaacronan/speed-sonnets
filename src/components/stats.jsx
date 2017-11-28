import React from 'react';
import { connect } from 'react-redux';

import { goToOptions } from '../core/actions/actions';
import { currentSonnetNumeral, elapsedTime, wpm, accuracy } from '../core/selectors/selectors';

class Stats extends React.Component {

  onBackClick = () => {
    this.props.goToOptions();
  }

  render() {
    return (
      <div className="stats">
        <h1>{`Typing stats for Sonnet ${this.props.currentSonnetNumeral}`}</h1>
        <button onClick={this.onBackClick}>Back</button>
        <p><b>Time: </b>{this.props.elapsedTime}</p>
        <p><b>WPM: </b>{this.props.wpm}</p>
        <p><b>Accuracy: </b>{this.props.accuracy}%</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentSonnetNumeral: currentSonnetNumeral(state),
    elapsedTime: elapsedTime(state),
    wpm: wpm(state),
    accuracy: accuracy(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToOptions: () => dispatch(goToOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
