import React from 'react';
import { connect } from 'react-redux';

import { goToOptions } from '../core/actions/actions';

class Stats extends React.Component {

  onBackClick = () => {
    this.props.goToOptions();
  }

  render() {
    return (
      <div className="stats">
        <h1>{`Typing stats for Sonnet ${this.props.sonnetNumber}`}</h1>
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
    elapsedTime: state.elapsedTime,
    wpm: state.wpm,
    accuracy: state.accuracy,
    sonnetNumber: state.sonnetNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToOptions: () => dispatch(goToOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
