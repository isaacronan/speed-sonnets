import moment from 'moment';
import { createSelector } from 'reselect';

const sonnets = state => state.sonnets;
const currentSonnetIndex = state => state.currentSonnetIndex;
const currentLineIndex = state => state.currentLineIndex;
const currentWordIndex = state => state.currentWordIndex;
const input = state => state.input;
const startTime = state => state.startTime;
const currentTime = state => state.currentTime;
const totalWords = state => state.totalWords;
const correctWords = state => state.correctWords;

export const currentSonnetNumeral = createSelector(
  [sonnets, currentSonnetIndex],
  (sonnets, currentSonnetIndex) => {
    return sonnets[currentSonnetIndex].numeral;
  }
)

export const currentSonnetLines = createSelector(
  [sonnets, currentSonnetIndex],
  (sonnets, currentSonnetIndex) => {
    return !sonnets.length || currentSonnetIndex === null ? [] : sonnets[currentSonnetIndex].lines;
  }
)

export const previousLines = createSelector(
  [currentSonnetLines, currentLineIndex],
  (currentSonnetLines, currentLineIndex) => {
    return currentSonnetLines.slice(0, currentLineIndex);
  }
)

export const nextLines = createSelector(
  [currentSonnetLines, currentLineIndex],
  (currentSonnetLines, currentLineIndex) => {
    return currentSonnetLines.slice(currentLineIndex + 1);
  }
)

const _words = createSelector(
  [sonnets, currentSonnetIndex, currentLineIndex],
  (sonnets, currentSonnetIndex, currentLineIndex) => {
    return sonnets[currentSonnetIndex].lines[currentLineIndex].split(' ');
  }
)

export const previousWords = createSelector(
  [_words, currentWordIndex],
  (_words, currentWordIndex) => {
    return _words.slice(0, currentWordIndex).join(' ');
  }
)

export const currentWord = createSelector(
  [_words, currentWordIndex],
  (_words, currentWordIndex) => {
    return _words[currentWordIndex];
  }
)

export const nextWords = createSelector(
  [_words, currentWordIndex],
  (_words, currentWordIndex) => {
    return _words.slice(currentWordIndex + 1).join(' ');
  }
)

export const isLastWord = createSelector(
  [_words, currentWordIndex],
  (_words, currentWordIndex) => {
    return currentWordIndex === _words.length - 1;
  }
)

export const isLastLine = createSelector(
  [currentSonnetLines, currentLineIndex],
  (currentSonnetLines, currentLineIndex) => {
    return currentLineIndex === currentSonnetLines.length - 1;
  }
)

export const inputMatchesWord = createSelector(
  [input, currentWord],
  (input, currentWord) => {
    return input === currentWord;
  }
)

export const elapsedTime = createSelector(
  [startTime, currentTime],
  (startTime, currentTime) => {
    return startTime ? moment.utc(currentTime.diff(startTime)).format('mm:ss.S') : moment.utc(0).format('mm:ss.S');
  }
)

export const wpm = createSelector(
  [totalWords, startTime],
  (totalWords, startTime) => {
    return Math.round(60 * totalWords / moment.utc(moment().diff(startTime)).unix());
  }
)

export const accuracy = createSelector(
  [totalWords, correctWords],
  (totalWords, correctWords) => {
    return (100 * correctWords / totalWords).toFixed(1);
  }
)
