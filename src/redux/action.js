export const UPDATE_PLAYBACK_RATE = 'UPDATE_PLAYBACK_RATE';
export const PLAY = 'PLAY';
export const SEEK = 'SEEK';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

export function updatePlaybackRate(audio, value) {
  const float = parseFloat(value);
  audio.current.playbackRate = float;

  return {
    type: UPDATE_PLAYBACK_RATE,
    payload: float
  };
}
export function stop() {
  return {
    type: PLAY,
    payload: true
  };
}
export function play(audio) {
  if (audio.current.paused) audio.current.play();
  else audio.current.pause();

  return {
    type: PLAY,
    payload: audio.current.paused
  };
}
export function setCurrentTime(currentTime) {
  return {
    type: SET_CURRENT_TIME,
    payload: currentTime
  };
}
export function seek(audio, currentTime) {
  audio.current.currentTime = currentTime;
  return {
    type: SEEK,
    payload: currentTime
  };
}
