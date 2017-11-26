export const SELECT_SONNET = 'SELECT_SONNET';
export const UPDATE_INPUT = 'UPDATE_INPUT';
export const START_TIMER = 'START_TIMER';
export const INCREMENT = 'INCREMENT';
export const SUBMIT_INPUT = 'SUBMIT_INPUT';
export const GO_TO_OPTIONS = 'GO_TO_OPTIONS';

let intervalID = null;

export function selectSonnet(sonnet) {
  return {
    type: SELECT_SONNET,
    sonnet
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

export function submitInput() {
  return {
    type: SUBMIT_INPUT,
    intervalID: intervalID
  };
}

export function goToOptions() {
  clearInterval(intervalID);
  return {
    type: GO_TO_OPTIONS,
    intervalID: intervalID
  };
}
