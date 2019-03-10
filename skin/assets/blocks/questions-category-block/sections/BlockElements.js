import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import PostsElement from './PostsElement';
import {
  PlaceholderElement,
} from '../../../elements';
import {BlockConsumer} from '../containers/BlockContext';

const BlockElementsConsumer = (props) => {
  const {
    values: {
      category,
      posts,
      allPosts,
    },
  } = props;

  const categoryId = (category) ? JSON.parse(category).value : 0;
  const postsArray = (posts) ? JSON.parse(posts) : [];

  if (!category || postsArray.length === 0) {
    return (
      <Fragment>
        {
          (categoryId === 0) ?
            <PlaceholderElement
              spinner={false}
              title={__('Please select category', 'quizess')}
            /> :
            <PlaceholderElement
              spinner={false}
              title={__('Please select posts', 'quizess')}
            />
        }
      </Fragment>
    );
  }
  if (!allPosts) {
    return (
      <Fragment>
        <PlaceholderElement
          spinner={true}
          title={__('Loading', 'quizess')}
        />
      </Fragment>
    );
  }


  return (
    <Fragment>
      <PostsElement
        postsArray={postsArray}
        allPosts={allPosts}
      />
    </Fragment>
  );
};


const BlockElements = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            category,
            posts,
          },
          allPosts,
        },
      } = value;
      return (
        <BlockElementsConsumer
          values={{
            category,
            posts,
            allPosts,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default BlockElements;
