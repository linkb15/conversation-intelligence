import { createStore } from 'redux';
import rootReducer from './reducer';
import theme from '../assets/theme/light';
export default function configureStore(initialState = { theme }) {
  return createStore(rootReducer, initialState);
}
