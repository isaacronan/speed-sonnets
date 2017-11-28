import React from 'react';
import { connect } from 'react-redux';

import { updateInput, submitInput, startTimer } from '../core/actions/actions';
import { isLastWord, isLastLine, inputMatchesWord, elapsedTime } from '../core/selectors/selectors';

class InputArea extends React.Component {

  onInputChange = (event) => {
    if(!this.props.timerIsRunning) {
      this.props.startTimer();
    }
    this.props.updateInput(event.target.value);
  }

  onKeyPress = (event) => {
    if(event.charCode === 32) {
      event.preventDefault();
      if(this.props.input) {
        this.props.submitInput(this.props.inputMatchesWord, this.props.isLastWord, this.props.isLastLine);
      }
    }
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  render() {
    return (
      <div className="input-area">
        <input ref="input" placeholder={!this.props.timerIsRunning ? "Start typing to begin" : ''} spellCheck="false" value={this.props.input} onChange={this.onInputChange} onKeyPress={this.onKeyPress}/>
        <p>{this.props.elapsedTime}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    input: state.input,
    timerIsRunning: state.timerIsRunning,
    elapsedTime: elapsedTime(state),
    inputMatchesWord: inputMatchesWord(state),
    isLastWord: isLastWord(state),
    isLastLine: isLastLine(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInput: input => dispatch(updateInput(input)),
    submitInput: (inputMatchesWord, isLastWord, isLastLine) => dispatch(submitInput(inputMatchesWord, isLastWord, isLastLine)),
    startTimer: () => dispatch(startTimer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputArea);
