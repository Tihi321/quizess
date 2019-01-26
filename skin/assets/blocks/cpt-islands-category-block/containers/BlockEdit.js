import {Component} from '@wordpress/element';
import {withSelect} from '@wordpress/data';
import App from '../components/App';

class edit extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      clientId: props.clientId,
      imageIndex: 0,
      postTitle: '',
    };

    this.dispatchAtributes = this.dispatchAtributes.bind(this);

  }

  dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'islands':
        this.props.setAttributes({
          islands: payload,
        });
        break;
      case 'category':
        this.props.setAttributes({
          category: payload,
        });
        break;
      default:
    }
  };

  dispatchState = ({action, payload}) => {
    switch (action) {
      case 'post':
        this.setState({
          imageIndex: payload.index,
          postTitle: payload.title,
        });
        break;
      default:
    }
  };

  render() {
    const {
      attributes,
      className,
      categories,
    } = this.props;
    return (
      <div>
        <App
          className={className}
          state={this.state}
          categories={categories}
          attributes={attributes}
          dispatchAtributes={this.dispatchAtributes}
          dispatchState={this.dispatchState}
        />
      </div>
    );
  }
}
/* eslint-disable */
const BlockEdit = withSelect((select) => {
  const query = {
    per_page: -1,
  };
  return {
    categories: select('core').getEntityRecords('taxonomy', 'question-topic', query),
  };
})(edit);
/* eslint-enable */
export default BlockEdit;
