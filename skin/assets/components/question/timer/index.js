import {PureComponent} from 'react';
import icons from './icons';

class Timer extends PureComponent {
  constructor(props) {
    super(props);

    const {
      endTime = 30,
      onEnd = null,
    } = props;

    this.endTime = endTime;
    this.onEnd = onEnd;

    const {disabled} = props;

    this.dontStart = (disabled || endTime === 0) || false;

    this.state = {
      time: this.endTime,
    };

  }

  startTimer = () => {
    this.timer = setInterval(() => this.setState({
      time: this.state.time - 1,
    }), 1000);
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({time: this.endTime});
  }

  componentDidMount() {
    if (!this.dontStart) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const {stop, play} = this.props;
    if (this.state.time === 0 || stop) {
      this.stopTimer();
      this.resetTimer();
      this.onEnd();
    }

    if (play) {
      this.startTimer();
    }

  }

  componentWillUnmount() {
    this.stopTimer();
  }

  getTimerElement = () => {
    const {disabled} = this.props;
    if (disabled) {
      return (
        <div className="timer__infinity">{icons.infinity}</div>
      );
    }
    return (
      <div className="timer__clock">{this.state.time}</div>
    );
  }


  render() {
    const renderElement = this.getTimerElement();
    return (
      <div className="timer">
        {renderElement}
      </div>
    );
  }
}

export default Timer;
