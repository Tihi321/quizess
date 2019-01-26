import Lottie from 'react-lottie';
import {Component} from 'react';
import {Spinner} from '@wordpress/components';

class LottieControl extends Component {
  constructor(props) {
    super(props);
    const {
      className = '',
      autoplay = true,
      loop = false,
      controls = true,
    } = props;

    this.className = className;
    this.autoplay = autoplay;
    this.loop = loop;
    this.controls = controls;

    this.state = {
      data: '',
      isStopped: false,
      loaded: false,
    };
    this.renderLottie = this.renderLottie.bind(this);
  }

  componentDidMount() {
    fetch(this.props.mediaUrl)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          data: response,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderLottie() {
    const defaultOptions = {
      loop: this.loop,
      autoplay: this.autoplay,
      animationData: this.state.data,
      rendererSettings: {
        preserveAspectRatio: 'none',
      },
    };

    if (this.controls) {
      return (
        <div
          role="presentation"
          className={this.className}
          onClick={() => this.setState({isStopped: !this.state.isStopped})}
        >
          <Lottie
            options={defaultOptions}
            isStopped={this.state.isStopped}
          />
        </div>
      );
    }

    return (
      <div
        role="presentation"
        className={this.wrapClass}
      >
        <Lottie
          options={defaultOptions}
        />
      </div>
    );
  }

  render() {
    const {loaded} = this.state;

    if (loaded) {
      return this.renderLottie();
    }
    return <Spinner />;
  }
}


export default LottieControl;
