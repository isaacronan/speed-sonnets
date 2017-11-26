import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { goToOptions } from '../core/actions/actions';

class TextDisplay extends React.Component {

  onBackClick = () => {
    this.props.goToOptions();
  }

  formattedSentence = () => {
    return (
      <div>
        {this.props.words.slice(0, this.props.currentWordIndex).join(' ')}
        <b className={this.props.inputMatchesWord ? 'correct': ''}> {this.props.words[this.props.currentWordIndex]} </b>
        {this.props.words.slice(this.props.currentWordIndex + 1).join(' ')}
      </div>
    )
  }

  render() {
    return (
      <div className="text-display">
        <h1>{`Sonnet ${this.props.sonnetNumber}`}</h1>
        <button onClick={this.onBackClick}>Back</button>
        {this.formattedSentence()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sonnetNumber: state.sonnetNumber,
    words: state.words,
    currentWordIndex: state.currentWordIndex,
    inputMatchesWord: state.inputMatchesWord
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToOptions: () => dispatch(goToOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
