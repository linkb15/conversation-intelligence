import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ControlPanel from './components/ControlPanel';
import Transcript from './components/Transcript';
import Search from './components/Search';
import styled from 'styled-components';
import * as mapDispatchToProps from './redux/action';
function App({ hover, transcript, conversation, setCurrentTime, play, updatePlaybackRate, paused, currentTime, seek, stop }) {
  const audio = useRef();
  let interval;
  const updateTime = () => {
    if (interval && paused) clearInterval(interval);
    else
      interval = setInterval(() => {
        setCurrentTime(audio.current.currentTime);
      }, 100);
  };
  const fnPlayPause = () => {
    play(audio);
  };
  const seekTime = time => {
    seek(audio, time);
  };
  const onEnded = () => {
    stop();
    setCurrentTime(0);
  };
  return (
    <div>
      <audio ref={audio} onPlay={updateTime} onPause={updateTime} onEnded={onEnded}>
        <source src={conversation} type='audio/wav' />
        Your browser does not support the audio element.
      </audio>
      <ControlPanel fnPlayPause={fnPlayPause} paused={paused} />
      <SearchWrapper>
        <Search placeholder='Search call transcript' />
      </SearchWrapper>
      {transcript.word_timings.map((e, i) => (
        <Transcript primary={i % 2 === 0} key={i} timing={e} hover={hover} currentTime={currentTime} setCurrentTime={seekTime}></Transcript>
      ))}
    </div>
  );
}

const SearchWrapper = styled.div`
  margin: 18px 26px 10px 26px;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(App);
