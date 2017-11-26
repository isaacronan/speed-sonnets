import React from 'react';
import { connect } from 'react-redux';
import { selectSonnet } from '../core/actions/actions';
import { sonnets } from '../core/constants/sonnets';

class TextOptions extends React.Component {

  onSonnetClick = (sonnet) => {
    this.props.selectSonnet(sonnet);
  }

  render() {
    return (
      <div className="text-options">
        <h1>Choose a sonnet:</h1>
        <ul>
          {sonnets.map((sonnet, index) => {
            return <li key={index} onClick={() => this.onSonnetClick(sonnet)}>{sonnet.numeral}</li>
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSonnet: sonnet => dispatch(selectSonnet(sonnet))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextOptions);
