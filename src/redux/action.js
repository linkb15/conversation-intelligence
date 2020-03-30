export const PLAY = 'PLAY';

export const simpleAction = () => dispatch => {
  dispatch({
    type: PLAY,
    payload: 'result_of_simple_action'
  });
};
