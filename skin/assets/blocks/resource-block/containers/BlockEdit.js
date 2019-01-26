import {Component} from '@wordpress/element';
import App from '../components/App';

export default class BlockEdit extends Component {
  constructor(props) {
    super(...arguments);

    this.dispatchAtributes = this.dispatchAtributes.bind(this);

  }

  dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'backgroundColor':
        this.props.setAttributes({
          backgroundColor: payload,
        });
        break;
      case 'title':
        this.props.setAttributes({
          title: payload,
        });
        break;
      case 'showTitle':
        this.props.setAttributes({
          showTitle: payload,
        });
        break;
      case 'link':
        this.props.setAttributes({
          link: payload,
        });
        break;
      case 'linkText':
        this.props.setAttributes({
          linkText: payload,
        });
        break;
      case 'customDomain':
        this.props.setAttributes({
          customDomain: payload,
        });
        break;
      case 'useCustomDomain':
        this.props.setAttributes({
          useCustomDomain: payload,
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
