import {Fragment} from '@wordpress/element';
import {withSelect} from '@wordpress/data';
import {__} from '@wordpress/i18n';
import PostsElement from './PostsElement';
import PlaceholderElement from '../../elements/PlaceholderElement';

const CategoryElementWithSelect = (props) => {
  const {
    posts,
    islands,
    dispatchAttributesStore,
    dispatchStateStore,
    state,
  } = props;

  const islandsObj = (islands) ? JSON.parse(islands) : {};
  const postsObj = {};

  if (posts && posts.length > 0) {
    posts.forEach((post) => {
      postsObj[post.id] = (islandsObj[post.id]) ? islandsObj[post.id] : {
        postTitle: post.title.rendered,
        postAuthorId: post.author,
        mediaUrl: '',
        mediaTitle: '',
        mediaId: 0,
        width: 140,
        height: 140,
        x: 0,
        y: 0,
      };
    });
  }

  return (
    <Fragment>
      {
        (!posts) ?
          <PlaceholderElement
            spinner={true}
            title={__('Loading category', 'design-islands')}
          /> :
          <PostsElement
            dispatchAttributesStore={dispatchAttributesStore}
            dispatchStateStore={dispatchStateStore}
            islands={(posts && posts.length > 0) ? postsObj : false}
            state={state}
          />
      }
    </Fragment>
  );
};

/* eslint-disable */
const CategoryElement = withSelect((select, {categoryId}) => {
  const query = {
    categories: categoryId,
    per_page: -1,
  };
  return {
    posts: select('core').getEntityRecords('postType', 'post', query),
  };
})(CategoryElementWithSelect);
/* eslint-enable */

export default CategoryElement;
