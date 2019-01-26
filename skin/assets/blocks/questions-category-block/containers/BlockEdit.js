import {withSelect} from '@wordpress/data';
import App from '../components/App';
import BlockProvider from './BlockContext';

const edit = (props) => {
  const {
    attributes,
    className,
    categories,
    allPosts,
  } = props;

  const dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'category':
        props.setAttributes({
          posts: '',
          category: payload,
        });
        break;
      case 'posts':
        props.setAttributes({
          posts: payload,
        });
        break;
      default:
    }
  };

  return (
    <BlockProvider
      dispatchAtributes={dispatchAtributes}
      attributes={attributes}
      allPosts={allPosts}
      categories={categories}
      className={className}
    >
      <App
        className={className}
      />
    </BlockProvider>
  );
};


/* eslint-disable */
const BlockEdit = withSelect((select,{attributes: {category}}) => {
  if ( !category ) {
    return {
      categories: select('core').getEntityRecords('taxonomy', 'question-topic'),
    };
  }

  const query = {
    categories: JSON.parse(category).value,
    per_page: -1,
    status: "publish",
  };
  return {
    categories: select('core').getEntityRecords('taxonomy', 'question-topic'),
    allPosts: select('core').getEntityRecords('postType', 'question', query),
  };
})(edit);
/* eslint-enable */
export default BlockEdit;

