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
      case 'mediaPosition':
        this.props.setAttributes({
          mediaPosition: payload,
        });
        break;
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
      case 'bodyContent':
        this.props.setAttributes({
          bodyContent: payload,
        });
        break;
      case 'bottomContent':
        this.props.setAttributes({
          bottomContent: payload,
        });
        break;
      case 'hoursWorked':
        this.props.setAttributes({
          hoursWorked: payload,
        });
        break;
      case 'hoursChecked':
        this.props.setAttributes({
          hoursChecked: payload,
        });
        break;
      case 'fontsChecked':
        this.props.setAttributes({
          fontsChecked: payload,
        });
        break;
      case 'fontsUsed':
        this.props.setAttributes({
          fontsUsed: payload,
        });
        break;
      case 'bodyContentChecked':
        this.props.setAttributes({
          bodyContentChecked: payload,
        });
        break;
      case 'bottomContentChecked':
        this.props.setAttributes({
          bottomContentChecked: payload,
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
