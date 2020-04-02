import React from 'react';
import styled from 'styled-components';
import PlayPause from './PlayPause';
import { ReactComponent as ForwardIcon } from '../assets/img/forward.svg';
import PillButton from './PillButton';
import Button from './Button';
import ShareIcon from '../assets/img/share.svg';

const ControlPanel = styled.div`
  display: flex;
  align-items: center;
  background-color: ${p => p.theme.navbarBg};
  padding: 11px 18px 14px 25px;
`;

const Forward = styled(ForwardIcon)`
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    > path {
      fill: ${p => p.theme.primary} !important;
    }
  }
`;

const Rewind = styled(Forward)`
  transform: scale(-1, 1);
  margin-left: 0;
  margin-right: 14px;
`;

const SpeedControl = styled(PillButton)`
  margin-left: 20px;
`;

const ShareButton = styled(Button)`
  margin-left: auto;
`;

export default ({ fnPlayPause, paused }) => {
  return (
    <ControlPanel>
      <Rewind />
      <PlayPause onClick={() => fnPlayPause()} paused={paused} />
      <Forward />
      <SpeedControl>1.0x</SpeedControl>
      <ShareButton>
        <img src={ShareIcon} alt='share' />
        Share
      </ShareButton>
    </ControlPanel>
  );
};
