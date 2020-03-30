import React, { useState } from 'react';
import { connect } from 'react-redux';
import ControlPanel from './components/ControlPanel';
import Transcript from './components/Transcript';
import Search from './components/Search';
import styled from 'styled-components';
function App({ hover, transcript }) {
  console.log(transcript);
  return (
    <div>
      {/* <audio controls>
        <source src={require('./assets/conversation.wav')} type='audio/wav' />
        Your browser does not support the audio element.
      </audio> */}
      <ControlPanel />
      <SearchWrapper>
        <Search placeholder='Search call transcript' />
      </SearchWrapper>
      {transcript.word_timings.map((e, i) => (
        <Transcript primary={i % 2 == 0} key={i} timing={e} hover={hover}></Transcript>
      ))}
    </div>
  );
}

const SearchWrapper = styled.div`
  margin: 18px 26px 10px 26px;
`;

function mapStateToProps(state) {
  console.log(state);
  return { transcript: state.transcript };
}

export default connect(mapStateToProps)(App);
