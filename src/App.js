import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ControlPanel from './components/ControlPanel';
import Transcript from './components/Transcript';
import Search from './components/Search';
import styled from 'styled-components';
import * as mapDispatchToProps from './redux/action';
import Waveform from './components/Waveform';
function App({ hover, transcript, conversation, setCurrentTime, play, updatePlaybackRate, paused, currentTime, seek, stop }) {
  const audio = useRef();
  let interval;
  const [duration, setDuration] = useState();
  useEffect(() => {
    const handleDuration = () => {
      setDuration(audio.current.duration);
    };
    const temp = audio.current;
    temp.addEventListener('loadedmetadata', handleDuration);
    return () => {
      temp.removeEventListener('loadedmetadata', handleDuration);
    };
  }, [audio]);
  const updateTime = () => {
    if (interval && paused) clearInterval(interval);
    else
      interval = setInterval(() => {
        setCurrentTime(audio.current.currentTime);
      }, 10);
  };

  const fnPlayPause = () => {
    play(audio);
  };
  const fnChangeSpeed = value => {
    updatePlaybackRate(audio, value);
  };

  const seekTime = time => {
    seek(audio, time);
  };

  const rewindForward = time => {
    let updateTime = currentTime + time;
    if (updateTime > duration) updateTime = duration;
    if (updateTime < 0) updateTime = 0;
    seek(audio, updateTime);
  };

  const onEnded = () => {
    stop();
  };
  const [search, setSearch] = useState('');
  const handleInputChange = e => {
    console.log(search);
    setSearch(e.target.value);
  };
  const [result, setResult] = useState(transcript.word_timings);
  useEffect(() => {
    const newResult = transcript.word_timings.filter(e => e.some(v => v.word.toLowerCase().includes(search.toLocaleLowerCase())));
    setResult(newResult);
  }, [search, transcript.word_timings]);
  return (
    <div>
      <audio ref={audio} onPlay={updateTime} onPause={updateTime} onEnded={onEnded}>
        <source src={conversation} type='audio/wav' />
        Your browser does not support the audio element.
      </audio>
      <ControlPanel fnPlayPause={fnPlayPause} paused={paused} fnChangeSpeed={fnChangeSpeed} fnSeek={rewindForward} />
      <Waveform timing={transcript.word_timings} currentTime={currentTime} duration={duration} seek={seekTime} />
      <SearchWrapper>
        <Search placeholder='Search call transcript' value={search} onChange={handleInputChange} />
      </SearchWrapper>
      {result.map((e, i) => (
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
