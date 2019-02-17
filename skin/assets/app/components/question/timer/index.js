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

    this.state = {
      time: 0,
    };

  }

  startTimer = () => {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1,
    }), 1000);
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({time: 0});
  }

  componentDidMount() {
    const {disabled} = this.props;
    if (!disabled) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const {stop, clear} = this.props;
    if (this.endTime === this.state.time || stop) {
      this.stopTimer();
      if (this.onEnd) {
        this.onEnd();
      }
    }

    if (clear) {
      this.resetTimer();
    }

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
