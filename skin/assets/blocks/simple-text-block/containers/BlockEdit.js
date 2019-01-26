import {Component} from '@wordpress/element';
import App from '../components/App';

export default class BlockEdit extends Component {
  constructor(props) {
    super(...arguments);

    this.dispatchAtributes = this.dispatchAtributes.bind(this);

  }

  dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'titlePosition':
        this.props.setAttributes({
          titlePosition: payload,
        });
        break;
      case 'backgroundColor':
        this.props.setAttributes({
          backgroundColor: payload,
        });
        break;
      case 'body':
        this.props.setAttributes({
          content: payload,
        });
        break;
      case 'title':
        this.props.setAttributes({
          title: payload,
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
