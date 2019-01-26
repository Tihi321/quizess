import {Component} from '@wordpress/element';
import App from '../components/App';

export default class BlockEdit extends Component {
  constructor(props) {
    super(...arguments);

    this.dispatchAtributes = this.dispatchAtributes.bind(this);

  }

  dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'media':
        this.props.setAttributes({
          mediaId: payload.id,
          mediaUrl: payload.url,
          mediaTitle: payload.title,
        });
        break;
      case 'mediaAlt':
        this.props.setAttributes({
          mediaAlt: payload,
        });
        break;
      case 'backgroundColor':
        this.props.setAttributes({
          backgroundColor: payload,
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
