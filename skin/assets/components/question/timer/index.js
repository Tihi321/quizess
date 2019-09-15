import {
  useUpdateEffect,
  useInterval,
  useEffectOnce,
  useCounter,
  useToggle,
} from 'react-use';
import icons from './icons';

const Timer = (props) => {
  const {
    endTime = 30,
    onEnd = null,
    disabled,
    play,
    stop,
  } = props;

  const dontStart = (disabled || endTime === 0) || false;

  const [time, {
    dec,
    reset: resetTime,
  }] = useCounter(endTime);


  const [onTimer, setUseTimer] = useToggle(false);

  // start interval without delay
  useInterval(() => dec(), (onTimer) ? 1000 : null);

  useEffectOnce(() => {
    if (!dontStart) {
      setUseTimer(true);
    }

    return () => {
      if (!dontStart) {
        resetTime();
        setUseTimer(false);
      }
    };
  }, []);

  useUpdateEffect(() => {
    if (time === 0 || stop) {
      resetTime();
      setUseTimer(false);
      onEnd();
    }

    if (play) {
      resetTime();
      setUseTimer(true);
    }
  });


  return (
    <div className={`timer timer--${props.theme}`}>
      {
        props.disabled ?
          <div className="timer__infinity">{icons.infinity}</div> :
          <div className="timer__clock">{time}</div>
      }
    </div>
  );
};

export default Timer;
