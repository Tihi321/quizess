import {Component} from '@wordpress/element';
import {withSelect} from '@wordpress/data';
import App from '../components/App';

class edit extends Component {
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
      case 'authors':
        this.props.setAttributes({
          authors: payload,
        });
        break;
      default:
    }
  };

  render() {
    const {attributes, className, posts} = this.props;
    return (
      <App className={className} posts={posts} attributes={attributes} dispatchAtributes={this.dispatchAtributes} />
    );
  }
}

const BlockEdit = withSelect((select) => {
  return {
    posts: select('core').getEntityRecords('postType', 'question'),
  };
})(edit);

export default BlockEdit;
