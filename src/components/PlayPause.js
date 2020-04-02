import Play from '../assets/img/play.svg';
import Pause from '../assets/img/pause.svg';
import React from 'react';
import styled from 'styled-components';
const Img = styled.img`
  cursor: pointer;
`;
const PlayPause = ({ paused, ...otherProps }) => <Img src={paused ? Play : Pause} alt='play-pause' {...otherProps} />;
export default PlayPause;
