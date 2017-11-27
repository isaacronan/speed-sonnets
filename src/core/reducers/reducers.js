import {
  LOAD_SONNETS,
  SELECT_SONNET,
  UPDATE_INPUT,
  START_TIMER,
  INCREMENT,
  SUBMIT_INPUT,
  GO_TO_OPTIONS } from '../actions/actions';
import moment from 'moment';

let initialState = {
  sonnets: [],
  sonnetNumber: '',
  lines: [],
  currentLineIndex: 0,
  get currentLine() {
    return this.lines.length ? this.lines[this.currentLineIndex] : '';
  },
  get words() {
    return this.currentLine.split(' ');
  },
  currentWordIndex: 0,
  get currentWord() {
    return this.words[this.currentWordIndex];
  },
  input: '',
  get inputMatchesWord() {
    return this.input === this.currentWord;
  },
  timerIsRunning: false,
  startTime: 0,
  elapsedTime: moment.utc(0).format('mm:ss.S'),
  correctWords: 0,
  totalWords: 0,
  wpm: '',
  accuracy: ''
}

export function rootReducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOAD_SONNETS:
      return Object.assign({}, state, {
        sonnets: action.sonnets
      });
    case SELECT_SONNET:
      return Object.assign({}, state, {
        sonnetNumber: action.sonnet.numeral,
        lines: action.sonnet.lines,
        currentLineIndex: 0,
        get currentLine() {
          return this.lines[this.currentLineIndex]
        },
        get words() {
          return this.currentLine.split(' ');
        },
        currentWordIndex: 0,
        get currentWord() {
          return this.words[this.currentWordIndex]
        },
        input: '',
        get inputMatchesWord() {
          return this.input === this.currentWord;
        }
      });
    case UPDATE_INPUT:
      return Object.assign({}, state, {
        input: action.input,
        get inputMatchesWord() {
          return this.input === state.currentWord;
        }
      });
    case START_TIMER:
      return Object.assign({}, state, {
        timerIsRunning: true,
        startTime: moment(),
        elapsedTime: moment.utc(0).format('mm:ss.S')
      });
    case INCREMENT:
      return Object.assign({}, state, {
        elapsedTime: moment.utc(moment().diff(state.startTime)).format('mm:ss.S')
      });
    case SUBMIT_INPUT:
      if(state.currentLineIndex === state.lines.length - 1 && state.currentWordIndex === state.words.length - 1) {
        clearInterval(action.intervalID);
        return Object.assign({}, state, {
          input: '',
          timerIsRunning: false,
          totalWords: state.totalWords + 1,
          correctWords: state.correctWords + (state.inputMatchesWord ? 1 : 0),
          get wpm() {
            return Math.round(60 * this.totalWords / moment.utc(moment().diff(state.startTime)).unix());
          },
          get accuracy() {
            return (100 * this.correctWords / this.totalWords).toFixed(1);
          }
        });
      } else {
        return Object.assign({}, state, {
          currentLineIndex: state.currentWordIndex === state.words.length - 1 ? state.currentLineIndex + 1 : state.currentLineIndex,
          get currentLine() {
            return state.lines[this.currentLineIndex]
          },
          get words() {
            return this.currentLine.split(' ');
          },
          currentWordIndex: state.currentWordIndex === state.words.length - 1 ? 0 : state.currentWordIndex + 1,
          get currentWord() {
            return this.words[this.currentWordIndex]
          },
          input: '',
          get inputMatchesWord() {
            return this.input === this.currentWord;
          },
          totalWords: state.totalWords + 1,
          correctWords: state.correctWords + (state.inputMatchesWord ? 1 : 0)
        });
      }
    case GO_TO_OPTIONS:
      clearInterval(action.intervalID);
      return Object.assign({}, state, {
        lines: [],
        timerIsRunning: false,
        startTime: 0,
        elapsedTime: moment.utc(0).format('mm:ss.S'),
        correctWords: 0,
        totalWords: 0
      });
    default:
      return state;
  }
}
