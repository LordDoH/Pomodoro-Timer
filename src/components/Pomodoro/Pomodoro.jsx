// Import React
import React, { useState, useRef, useEffect } from 'react';
// Import styled components
import styled from 'styled-components';
// Import image
import gearicon from '../../assets/images/gear.svg';
import checkicon from '../../assets/images/check.svg';
// Import audio
import alarm from '../../assets/audio/ring.mp3';

const Wrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  box-shadow: -5px 14px 44px #000000, 5px -16px 50px rgba(255, 255, 255, 0.15);
  display: flex;
  height: 518px;
  justify-content: center;
  position: relative;
  width: 518px;
`;

const Ring = styled.div`
  position: absolute;
  left: 0;
  stroke: ${(props) => props.colorRing || 'white'};
  top: 0;
  z-index: 1;
`;

const Timer = styled.div`
  align-items: center;
  background: radial-gradient(
    71.4% 71.4% at 51.7% 28.6%,
    #3a393f 0%,
    #17171a 100%
  );
  border-radius: 50%;
  box-shadow: inset 0px 0px 114px rgba(0, 0, 0, 0.45);
  color: white;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: center;
  position: relative;
  width: 500px;
  z-index: 2;
`;

const Time = styled.div`
  display: flex;
  font-family: 'bebas';
  font-size: 196px;
  margin: 28px auto;
  position: relative;
  top: 28px;
`;

const Minutes = styled.div`
  padding: 0 2px;
`;

const Seconds = styled.div`
  padding: 0 2px;
`;

const MinutesCounter = styled.input`
  border: 0;
  border-bottom: 1px dashed white;
  background: none;
  color: white;
  font-family: 'bebas';
  font-size: 196px;
  height: 170px;
  width: 150px;
  text-align: center;
  outline: none;
  :disabled {
    border-bottom: none;
  }
`;

const SecondsCounter = styled.input`
  border: 0;
  border-bottom: 1px dashed white;
  background: none;
  color: white;
  font-family: 'bebas';
  font-size: 196px;
  height: 170px;
  width: 150px;
  text-align: center;
  outline: none;
  :disabled {
    border-bottom: none;
  }
`;

const Colon = styled.div``;

const Gear = styled.img``;

const Start = styled.button`
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  letter-spacing: 10px;
  line-height: 20px;
  background: none;
  color: white;
  opacity: 0.5;
  border: none;
  text-transform: uppercase;
  margin-bottom: 22px;
  :hover {
    opacity: 1;
  }
`;

const Settings = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.3;
  :hover {
    opacity: 1;
  }
`;

function Pomodoro() {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [settings, setSettings] = useState(false);
  const [done, setDone] = useState(false);
  const [start, setStart] = useState(false);

  const mCounter = useRef(null);
  const sCounter = useRef(null);

  const song = new Audio(alarm);

  const playSong = () => {
    song.play();
  };

  useEffect(() => {
    if (done === true) {
      setStart(false);
      playSong();
      setTimeout(() => {
        // eslint-disable-next-line
        alert('The time is over, enjoy your break');
      }, 1000);
    }
  }, [done]);

  if (start) {
    const interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          setDone(true);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const onClickSet = () => {
    setSettings(!settings);
    setStart(false);
    mCounter.current.disabled = settings;
    sCounter.current.disabled = settings;
  };

  const onClickStart = () => {
    setSettings(false);
    setDone(false);
    setStart(!start);
    mCounter.current.disabled = true;
    sCounter.current.disabled = true;
  };

  const onChangeMin = (e) => {
    if (e.target.value > 60) {
      setMinutes(60);
      setSeconds(0);
    } else {
      setMinutes(Number(e.target.value));
    }
  };

  const onChangeSec = (e) => {
    if (minutes === 60) {
      setSeconds(0);
    } else if (e.target.value > 59) {
      setSeconds(59);
    } else {
      setSeconds(Number(e.target.value));
    }
  };

  return (
    <Wrapper>
      <Ring colorRing={!done ? '#09a65a' : '#900A0A'}>
        <svg width="518" height="518" viewBox="0 0 518 518">
          <circle strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
        </svg>
      </Ring>

      <Timer>
        <Time>
          <Minutes>
            <MinutesCounter
              ref={mCounter}
              type="text"
              value={timerMinutes}
              disabled
              onChange={onChangeMin}
            />
          </Minutes>
          <Colon>:</Colon>
          <Seconds>
            <SecondsCounter
              ref={sCounter}
              type="text"
              value={timerSeconds}
              disabled
              onChange={onChangeSec}
            />
          </Seconds>
        </Time>
        <Start onClick={onClickStart}>{!start ? 'start' : 'stop'}</Start>
        <Settings onClick={onClickSet}>
          {settings ? (
            <Gear src={checkicon} alt="Checked" />
          ) : (
            <Gear src={gearicon} alt="Settings" />
          )}
        </Settings>
      </Timer>
    </Wrapper>
  );
}

export default Pomodoro;
