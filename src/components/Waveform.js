import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { Fragment } from 'react';
const Waveform = ({ timing, currentTime, duration = 1, seek }) => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const rectWidth = 2;
  const gap = 1;
  const ref = useRef(null);
  const elapsedTime = currentTime / duration;
  useEffect(() => {
    const divWidth = ref.current ? ref.current.offsetWidth : 0;
    setWidth(divWidth);
    setLeft(ref.current ? ref.current.offsetLeft : 0);

    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
      setLeft(ref.current.offsetLeft);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  const readTime = time => parseFloat(time.slice(0, -1));
  const conversationWave = (widthPercentage, startX, first) => {
    let array = [];
    const conversationLength = Math.floor((width * widthPercentage) / (rectWidth + gap));
    for (let i = 0; i < conversationLength; i++) {
      const isElapsed = elapsedTime * width >= startX * width + i * (rectWidth + gap);
      array.push(<Rect key={i} width='2' height='25' x={i * (rectWidth + gap)} y='0' elapsed={isElapsed} first={first} />);
    }
    return array;
  };
  return (
    <WaveformWrapper>
      <Time>
        {dayjs()
          .hour(0)
          .minute(0)
          .second(currentTime)
          .format('mm:ss')}{' '}
        <Duration>
          {' / '}
          {dayjs()
            .hour(0)
            .minute(0)
            .second(duration)
            .format('mm:ss')}
        </Duration>
      </Time>
      <Wrapper>
        <WaveTitleWrapper>
          <svg width={'100%'} height={55} x={0}>
            {timing.map((e, i) => {
              const startTime = readTime(timing[i][0].startTime);
              const endTime = readTime(timing[i][timing[i].length - 1].endTime);
              const conversationWidth = (endTime - startTime) / duration;
              const startX = startTime / duration;
              return (
                <Fragment key={i}>
                  <WaveTitle x='0' y={i === 0 ? 15 : 45} first={i === 0}>
                    {Math.round(conversationWidth * 100)}% {i === 0 ? ' YOU' : ' PROSPECT'}
                  </WaveTitle>
                  {i === 0 && (
                    <>
                      <ElapsedLine x1='0' y1='27' x2='100%' y2='27' />
                    </>
                  )}
                </Fragment>
              );
            })}
          </svg>
        </WaveTitleWrapper>
        <Wave ref={ref}>
          <svg
            width={'100%'}
            height={55}
            onClick={e => {
              const mousePos = e.clientX;
              const currentPos = mousePos - left;
              const mouseDuration = (currentPos / width) * duration;
              seek(mouseDuration);
            }}>
            <ElapsedLine x1='0' y1='22' x2='0' y2='32' />
            <ElapsedLine x1='100%' y1='22' x2='100%' y2='32' />
            {timing.map((e, i) => {
              const startTime = readTime(timing[i][0].startTime);
              const endTime = readTime(timing[i][timing[i].length - 1].endTime);
              const conversationWidth = (endTime - startTime) / duration;
              const startX = startTime / duration;
              return (
                <Fragment key={i}>
                  <svg width={`${conversationWidth * width}`} x={`${startX * width}`} y={i === 1 ? 30 : 0} height={25}>
                    {conversationWave(conversationWidth, startX, i === 0)}
                  </svg>
                  {i === 0 && (
                    <>
                      <ElapsedLine x1='0' y1='27' x2='100%' y2='27' />
                      <DurationLine x1='0' y1='27' x2={`${elapsedTime * width}`} y2='27' />
                      <DurationLine x1={`${elapsedTime * width}`} y1='0' x2={`${elapsedTime * width}`} y2='100%' />
                    </>
                  )}
                </Fragment>
              );
            })}
            <DurationRect width={`${elapsedTime * width}`} height='55' y='0' />
          </svg>
        </Wave>
      </Wrapper>
    </WaveformWrapper>
  );
};

export default Waveform;

const WaveformWrapper = styled.div`
  padding: 20px 24px 22px;
  background: #fafbfc;
  box-shadow: 0px 1px 0px #dfe2e5;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 24px;
`;

const Wave = styled.div`
  width: 100%;
  height: 55px;
  cursor: pointer;
`;
const WaveTitleWrapper = styled.div`
  height: 55px;
  width: 12%;
`;
const WaveTitle = styled.text`
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  fill: ${p => (p.first ? '#1A99F6' : '#8868e9')};
`;
const ElapsedLine = styled.line`
  stroke: #dfe2e5;
  stroke-width: 1;
`;
const DurationLine = styled.line`
  stroke: #7e8fa5;
`;

const Time = styled.div`
  padding: 3px 6px 5px 7px;
  margin-left: 1px;
  font-weight: 600;
  font-size: 12px;
  width: max-content;
  line-height: 12px;
  color: #354053;
  background: #eff3f6;
  border-radius: 3px;
`;

const Duration = styled.span`
  text-align: right;
  color: #7e8fa5;
`;

const Rect = styled.rect`
  fill: ${p => (p.elapsed ? '#b7c0ce' : p.first ? '#1A99F6' : '#8868e9')};
  :hover {
    fill-opacity: 0.6;
  }
`;

const DurationRect = styled.rect`
  fill: #1a99f6;
  fill-opacity: 0.2;
`;
