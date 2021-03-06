import moment from 'moment';

import {
  LOAD_SONNETS,
  SELECT_SONNET,
  UPDATE_INPUT,
  START_TIMER,
  INCREMENT,
  SUBMIT_INPUT,
  GO_TO_OPTIONS } from '../actions/actions';

import { inputMatchesWord, isLastWord, isLastLine } from '../selectors/selectors';

let initialState = {
  sonnets: [],
  currentSonnetIndex: null,
  currentLineIndex: 0,
  currentWordIndex: 0,
  input: '',
  timerIsRunning: false,
  startTime: 0,
  currentTime: 0,
  totalWords: 0,
  correctWords: 0
}

export function rootReducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOAD_SONNETS:
      return Object.assign({}, state, {
        sonnets: action.sonnets
      });
    case SELECT_SONNET:
      return Object.assign({}, state, {
        currentSonnetIndex: action.index
      });
    case UPDATE_INPUT:
      return Object.assign({}, state, {
        input: action.input
      });
    case START_TIMER:
      return Object.assign({}, state, {
        timerIsRunning: true,
        startTime: moment(),
        currentTime: moment()
      });
    case INCREMENT:
      return Object.assign({}, state, {
        currentTime: moment()
      });
    case SUBMIT_INPUT:
      if(isLastLine(state) && isLastWord(state)) {
        clearInterval(action.intervalID);
        return Object.assign({}, state, {
          input: '',
          timerIsRunning: false,
          totalWords: state.totalWords + 1,
          correctWords: state.correctWords + (inputMatchesWord(state) ? 1 : 0)
        });
      } else {
        return Object.assign({}, state, {
          currentLineIndex: isLastWord(state) ? state.currentLineIndex + 1 : state.currentLineIndex,
          currentWordIndex: isLastWord(state) ? 0 : state.currentWordIndex + 1,
          input: '',
          totalWords: state.totalWords + 1,
          correctWords: state.correctWords + (inputMatchesWord(state) ? 1 : 0)
        });
      }
    case GO_TO_OPTIONS:
      clearInterval(action.intervalID);
      return Object.assign({}, state, {
        currentSonnetIndex: null,
        currentLineIndex: 0,
        currentWordIndex: 0,
        input: '',
        timerIsRunning: false,
        startTime: 0,
        totalWords: 0,
        correctWords: 0
      });
    default:
      return state;
  }
}
