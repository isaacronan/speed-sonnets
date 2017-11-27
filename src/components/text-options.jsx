import React from 'react';
import { connect } from 'react-redux';
import { fetchSonnets, selectSonnet } from '../core/actions/actions';

class TextOptions extends React.Component {

  onSonnetClick = (sonnet) => {
    this.props.selectSonnet(sonnet);
  }

  componentDidMount() {
    this.props.fetchSonnets();
  }

  render() {
    return (
      <div className="text-options">
        <h1>Choose a sonnet:</h1>
        <ul>
          {this.props.sonnets.map((sonnet, index) => {
            return <li key={index} onClick={() => this.onSonnetClick(sonnet)}>{sonnet.numeral}</li>
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sonnets: state.sonnets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSonnets: () => dispatch(fetchSonnets()),
    selectSonnet: sonnet => dispatch(selectSonnet(sonnet))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextOptions);
