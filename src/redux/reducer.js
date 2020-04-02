import { PLAY, SEEK, SET_CURRENT_TIME, UPDATE_PLAYBACK_RATE } from './action';
import theme from '../assets/theme/light';
import transcript from '../assets/transcript.json';
import conversation from '../assets/conversation.wav';
const initialState = {
  theme,
  transcript,
  conversation,
  paused: true,
  currentTime: 0,
  playbackRate: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return { ...state, paused: action.payload };
    case SEEK:
      return { ...state, currentTime: action.payload };
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case UPDATE_PLAYBACK_RATE:
      return { ...state, playbackRate: action.payload };
    default:
      return state;
  }
};
