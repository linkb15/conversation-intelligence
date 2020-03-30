import styled, { css } from 'styled-components';
import Button from './Button';
import React from 'react';
import dayjs from 'dayjs';

const Transcript = ({ timing, primary, hover }) => {
  const startTime = parseFloat(timing[0].startTime.slice(0, -1));
  console.log(startTime);
  return (
    <Wrapper primary={primary} hover={hover}>
      <TranscriptWrapper primary={primary}>
        <TranscriptStartTime primary={primary}>
          {dayjs()
            .minute(0)
            .second(startTime)
            .format('mm:ss')}
        </TranscriptStartTime>
        <TranscriptText primary={primary}>
          {timing.map((e, i) => {
            return (
              <>
                <TranscriptWord key={i} primary={primary}>
                  {e.word}
                </TranscriptWord>{' '}
              </>
            );
          })}
          <Share primary={primary}>Share</Share>
        </TranscriptText>
      </TranscriptWrapper>
    </Wrapper>
  );
};
export default Transcript;
const Share = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  color: ${p => (p.primary ? '#1a99f6' : '#8868E9')};
  opacity: 0;
  height: 0;
  padding: 0;
  transition: all 0.5s;
  cursor: pointer;
`;
const TranscriptText = styled.div`
  font-size: 13px;
  line-height: 17px;
  overflow-wrap: break-word;
  padding-left: 9px;
  color: #${p => (p.primary ? '556c86' : '354053')};
  width: 75%;
  mix-blend-mode: normal;
  border-left: 2px solid ${p => (p.primary ? 'rgba(13, 119, 198, 0.25)' : 'rgba(136, 104, 233, 0.25)')};
`;
const hoverCss = css`
  background: ${p => (p.primary ? 'rgba(26, 153, 246, 0.05)' : 'rgba(136, 104, 233, 0.05)')};
  ${Share} {
    opacity: 1;
    height: unset;
    padding: 7px 0px;
  }
  ${TranscriptText} {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Wrapper = styled.div`
  transition: all 0.5s;
  margin-top: 20px;
  :hover {
    ${hoverCss}
  }
  ${({ hover }) => (hover ? hoverCss : '')}
`;

const TranscriptWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: ${p => (p.primary ? 25 : 70)}px;
`;

const TranscriptStartTime = styled.h5`
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  color: ${p => (p.primary ? '#1a99f6' : '#8868E9')};
  margin-right: 9px;
`;

const TranscriptWord = styled.span`
  cursor: pointer;
  :hover {
    background: ${p => (p.primary ? 'rgba(26, 153, 246, 0.25)' : 'rgba(136, 104, 233, 0.25)')};
    border-radius: 2px;
  }
`;
