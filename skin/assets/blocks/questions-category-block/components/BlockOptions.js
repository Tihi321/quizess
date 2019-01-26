import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
} from '@wordpress/editor';
import {__} from '@wordpress/i18n';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import {BlockConsumer} from '../containers/BlockContext';

const BlockOptionsConsumer = (props) => {
  const {
    values: {
      handleCategoryChange,
      handlePostChange,
      category,
      posts,
      categories,
      allPosts,
    },
  } = props;

  let isDisabled = true;
  let categoryOptions = [];

  let isDisabledPosts = true;
  let postsOptions = [];

  if (categories) {
    isDisabled = false;
    categoryOptions = categories.filter((cat) => cat.id !== 1).map((cat) => {
      return {
        value: cat.id,
        label: cat.name,
        url: cat.link,
      };
    });
  }

  if (allPosts) {
    isDisabledPosts = false;
    postsOptions = allPosts.filter((post) => post.id !== 1).map((post) => {
      return {
        value: post.id,
        label: post.title.rendered,
        url: post.link,
      };
    });
  }

  const categorySelectElement = (
    <Select
      className="category-select"
      isDisabled={isDisabled}
      isSearchable
      closeMenuOnSelect={true}
      components={makeAnimated()}
      value={(category) ? JSON.parse(category) : false}
      onChange={handleCategoryChange}
      options={categoryOptions}
      placeholder={__('Select', 'quizess')}
    />
  );

  const postsElement = (
    <Select
      className="posts-select"
      isDisabled={isDisabledPosts}
      isSearchable
      isMulti
      closeMenuOnSelect={true}
      components={makeAnimated()}
      value={(posts) ? JSON.parse(posts) : false}
      onChange={handlePostChange}
      options={postsOptions}
      placeholder={__('Select', 'quizess')}
    />
  );



  return (
    <Fragment>
      <InspectorControls>
        <div className="di-panel-group">
          <div className="di-label-mce-class">
            {__('Choose category', 'quizess')}
          </div>
          {categorySelectElement}
        </div>
        <div className="di-panel-group">
          <div className="di-label-mce-class">
            {__('Choose posts', 'quizess')}
          </div>
          {postsElement}
        </div>
      </InspectorControls>
    </Fragment>
  );
};

const BlockOptions = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values:
        {
          attributes: {
            category,
            posts,
          },
          categories,
          allPosts,
        },
        attributesStore: {
          handleCategoryChange,
          handlePostChange,
        },
      } = value;
      return (
        <BlockOptionsConsumer
          values={{
            category,
            posts,
            categories,
            allPosts,
            handleCategoryChange,
            handlePostChange,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default BlockOptions;
