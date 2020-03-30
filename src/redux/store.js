import { createStore } from 'redux';
import rootReducer from './reducer';
import theme from '../assets/theme/light';
import transcript from '../assets/transcript.json';
export default function configureStore(initialState = { theme, transcript }) {
  return createStore(rootReducer, initialState);
}
