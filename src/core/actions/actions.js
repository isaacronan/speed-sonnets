export const LOAD_SONNETS = 'LOAD_SONNETS';
export const SELECT_SONNET = 'SELECT_SONNET';
export const UPDATE_INPUT = 'UPDATE_INPUT';
export const START_TIMER = 'START_TIMER';
export const INCREMENT = 'INCREMENT';
export const SUBMIT_INPUT = 'SUBMIT_INPUT';
export const GO_TO_OPTIONS = 'GO_TO_OPTIONS';

import { sonnets } from '../constants/sonnets';

let intervalID = null;

export function fetchSonnets() {
  return function(dispatch) {
    dispatch({
      type: LOAD_SONNETS,
      sonnets: sonnets
    })
  }
}

export function selectSonnet(index) {
  return {
    type: SELECT_SONNET,
    index
  };
}

export function updateInput(input) {
  return {
    type: UPDATE_INPUT,
    input
  };
}

export function startTimer() {
  return function(dispatch) {
    dispatch({
      type: START_TIMER
    });
    intervalID = setInterval(() => {
      dispatch(increment());
    }, 100);
  };
}

export function increment() {
  return {
    type: INCREMENT
  }
}

export function submitInput(inputMatchesWord, isLastWord, isLastLine) {
  return {
    type: SUBMIT_INPUT,
    intervalID,
    inputMatchesWord,
    isLastWord,
    isLastLine
  };
}

export function goToOptions() {
  return {
    type: GO_TO_OPTIONS,
    intervalID
  };
}
