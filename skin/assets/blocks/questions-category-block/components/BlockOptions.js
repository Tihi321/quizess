import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  PanelColorSettings,
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
      fontColor,
      backgroundColor,
      handleOnBackgroundChange,
      handleOnFontColorChange,
      rows,
      theme,
      handleThemeChange,
      handleRowsChange,
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

  const columnsSelectElement = (
    <Select
      className="collumns-select"
      closeMenuOnSelect={true}
      value={(rows) ? JSON.parse(rows) : {value: 'row', label: 'Row'}}
      onChange={handleRowsChange}
      options={[
        {value: 'row', label: 'Row'},
        {value: 'columns', label: 'Columns'},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

  const themeSelectElement = (
    <Select
      className="collumns-select"
      closeMenuOnSelect={true}
      value={(theme) ? JSON.parse(theme) : {value: 'light', label: 'Light'}}
      onChange={handleThemeChange}
      options={[
        {value: 'light', label: 'Light'},
        {value: 'dark', label: 'Dark'},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

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
        <div className="qz-panel-group qz-panel-group--big">
          <div className="qz-panel-group">
            <div className="qz-label-mce-class">
              {__('Category', 'quizess')}
            </div>
            {categorySelectElement}
            <div className="qz-help-mce-class">
              {__('Select Category for question posts.', 'quizess')}
            </div>
          </div>
          <div className="qz-panel-group">
            <div className="qz-label-mce-class">
              {__('Posts', 'quizess')}
            </div>
            {postsElement}
            <div className="qz-help-mce-class">
              {__('Select Question posts from the category.', 'quizess')}
            </div>
          </div>
        </div>
        <div className="qz-panel-group qz-panel-group--big">
          <div className="qz-option-title-class">
            {__('Style Options', 'design-islands')}
          </div>
          <div className="qz-panel-group">
            <div className="qz-label-mce-class">
              {__('Type', 'quizess')}
            </div>
            {columnsSelectElement}
            <div className="qz-help-mce-class">
              {__('Choose weather place answers in row or 2 columns.', 'quizess')}
            </div>
          </div>
          <div className="qz-panel-group">
            <div className="qz-label-mce-class">
              {__('Theme', 'quizess')}
            </div>
            {themeSelectElement}
            <div className="qz-help-mce-class">
              {__('Theme color for answers', 'quizess')}
            </div>
          </div>
        </div>
        <PanelColorSettings
          title={__('Font Settings', 'quizess')}
          initialOpen={false}
          colorSettings={[
            {
              value: fontColor,
              onChange: handleOnFontColorChange,
              label: __('Font Color', 'quizess'),
            },
          ]}
        />
        <PanelColorSettings
          title={__('Background Settings', 'quizess')}
          initialOpen={false}
          colorSettings={[
            {
              value: backgroundColor,
              onChange: handleOnBackgroundChange,
              label: __('Background Color', 'quizess'),
            },
          ]}
        />
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
            fontColor,
            backgroundColor,
            rows,
            theme,
          },
          categories,
          allPosts,
        },
        attributesStore: {
          handleCategoryChange,
          handlePostChange,
          handleOnBackgroundChange,
          handleOnFontColorChange,
          handleThemeChange,
          handleRowsChange,
        },
      } = value;
      return (
        <BlockOptionsConsumer
          values={{
            rows,
            theme,
            category,
            posts,
            categories,
            allPosts,
            fontColor,
            backgroundColor,
            handleCategoryChange,
            handlePostChange,
            handleOnBackgroundChange,
            handleOnFontColorChange,
            handleThemeChange,
            handleRowsChange,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default BlockOptions;
