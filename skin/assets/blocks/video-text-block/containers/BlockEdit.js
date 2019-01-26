import {Component} from '@wordpress/element';
import App from '../components/App';

export default class BlockEdit extends Component {
  constructor(props) {
    super(...arguments);

    this.dispatchAtributes = this.dispatchAtributes.bind(this);

  }

  dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'sourceType':
        this.props.setAttributes({
          sourceType: payload,
        });
        break;
      case 'media':
        this.props.setAttributes({
          mediaUrl: payload.url,
          mediaId: payload.id,
        });
        break;
      case 'youtubeUrl':
        this.props.setAttributes({
          youtubeUrl: payload,
        });
        break;
      case 'showEmbed':
        if (!payload) {
          this.props.setAttributes({
            showEmbed: payload,
          });
        } else {
          this.props.setAttributes({
            showEmbed: true,
            youtubeID: payload,
          });
        }
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
      case 'bodyContentChecked':
        this.props.setAttributes({
          bodyContentChecked: payload,
        });
        break;
      case 'titleChecked':
        this.props.setAttributes({
          titleChecked: payload,
        });
        break;
      case 'theme':
        this.props.setAttributes({
          theme: payload,
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
