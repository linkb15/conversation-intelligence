import React, { useState } from 'react';
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

const SpeedControlMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 50px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #d0d9e2;
  left: -25%;
  /* top: 28px; */

  div {
    border-radius: 4px;
    :hover {
      background-color: rgba(26, 153, 246, 0.25);
    }
  }
`;

const SpeedControl = styled(PillButton)`
  margin-left: 20px;
  position: relative;
  :hover {
    ${SpeedControlMenu} {
      display: block;
    }
  }
`;

const ShareButton = styled(Button)`
  margin-left: auto;
`;

export default ({ fnPlayPause, paused, fnSeek, fnChangeSpeed }) => {
  const speedArray = [
    { label: '0.5x', value: 0.5 },
    { label: '0.75x', value: 0.75 },
    { label: '1.0x', value: 1 },
    { label: '1.5x', value: 1.5 },
    { label: '2.0x', value: 2 }
  ];
  const [speed, setSpeed] = useState(2);
  return (
    <ControlPanel>
      <Rewind onClick={() => fnSeek(-10)} />
      <PlayPause onClick={() => fnPlayPause()} paused={paused} />
      <Forward onClick={() => fnSeek(10)} />
      <SpeedControl>
        {speedArray[speed].label}
        <SpeedControlMenu>
          {speedArray.map((e, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setSpeed(i);
                  fnChangeSpeed(e.value);
                }}>
                {e.label}
              </div>
            );
          })}
        </SpeedControlMenu>
      </SpeedControl>

      <ShareButton>
        <img src={ShareIcon} alt='share' />
        Share
      </ShareButton>
    </ControlPanel>
  );
};
