import {Component} from '@wordpress/element';
import App from '../components/App';

export default class BlockEdit extends Component {
  constructor(props) {
    super(...arguments);

    this.dispatchAtributes = this.dispatchAtributes.bind(this);

  }

  dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'useTimer':
        this.props.setAttributes({
          useTimer: payload,
        });
        break;
      case 'timer':
        this.props.setAttributes({
          timer: payload,
        });
        break;
      case 'successMessage':
        this.props.setAttributes({
          successMessage: payload,
        });
        break;
      case 'welcomeMessage':
        this.props.setAttributes({
          welcomeMessage: payload,
        });
        break;
      case 'failureMessage':
        this.props.setAttributes({
          failureMessage: payload,
        });
        break;
      default:
    }
  };

  render() {
    const {attributes, className} = this.props;
    return (
      <App className={className} attributes={attributes} dispatchAtributes={this.dispatchAtributes} />
    );
  }
}
