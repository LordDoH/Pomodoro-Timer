// Import React
import React from 'react';
// Import styled components
import styled from 'styled-components';
// Import Pomodoro Timer
import Pomodoro from './Pomodoro/Pomodoro';
import Footer from './Footer/Footer';

const Main = styled.div`
  align-items: center;
  background: #2b2a30;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  min-width: 100%;
  padding: 0;
`;

function Clock() {
  return (
    <>
      <Main>
        <Pomodoro />
      </Main>
      <Footer />
    </>
  );
}

export default Clock;
