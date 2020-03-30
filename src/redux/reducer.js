import { PLAY } from './action';

export default (state, action) => {
  switch (action.type) {
    case PLAY:
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
