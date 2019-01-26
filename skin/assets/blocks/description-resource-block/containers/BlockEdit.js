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
      case 'resource':
        this.props.setAttributes({
          resource: payload,
        });
        break;
      case 'description':
        this.props.setAttributes({
          description: payload,
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
      case 'customFileType':
        this.props.setAttributes({
          customFileType: payload,
        });
        break;
      case 'useCustomFileType':
        this.props.setAttributes({
          useCustomFileType: payload,
        });
        break;
      case 'fileChange':
        this.props.setAttributes({
          fileId: payload.id,
          fileTitle: payload.title,
          fileUrl: payload.url,
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
