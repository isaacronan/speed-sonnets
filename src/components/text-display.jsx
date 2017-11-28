import React from 'react';
import { connect } from 'react-redux';

import { goToOptions } from '../core/actions/actions';
import { currentSonnetNumeral, currentSonnetLines, previousLines, nextLines, previousWords, currentWord, nextWords, inputMatchesWord } from '../core/selectors/selectors';

class TextDisplay extends React.Component {

  onBackClick = () => {
    this.props.goToOptions();
  }

  previousLines = () => {
    return (
      <div>
        {this.props.previousLines.map((line, index) => {
          return <p key={index}>{line}</p>
        })}
      </div>
    )
  }

  currentLine = () => {
    return (
      <p className="current-line">
        {this.props.previousWords}
        <b className={this.props.inputMatchesWord ? 'correct': ''}> {this.props.currentWord} </b>
        {this.props.nextWords}
      </p>
    )
  }

  nextLines = () => {
    return (
      <div>
        {this.props.nextLines.map((line, index) => {
          return <p key={index}>{line}</p>
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="text-display">
        <h1>{`Sonnet ${this.props.currentSonnetNumeral}`}</h1>
        <button onClick={this.onBackClick}>Back</button>
        {this.previousLines()}
        {this.currentLine()}
        {this.nextLines()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputMatchesWord: inputMatchesWord(state),
    currentSonnetNumeral: currentSonnetNumeral(state),
    currentSonnetLines: currentSonnetLines(state),
    previousLines: previousLines(state),
    nextLines: nextLines(state),
    previousWords: previousWords(state),
    currentWord: currentWord(state),
    nextWords: nextWords(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToOptions: () => dispatch(goToOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
