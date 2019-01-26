import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
} from '@wordpress/editor';
import {
  PanelBody,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const BlockOptions = (props) => {
  const {
    attributes: {
      category,
    },
    dispatchAttributesStore: {
      handleCategoryChange,
    },
    categories,
    postTitle,
  } = props;

  let isDisabled = true;
  let categoryOptions = [];


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

  const categorySelectElement = (
    <Select
      className="authors-select"
      isDisabled={isDisabled}
      isSearchable
      closeMenuOnSelect={true}
      components={makeAnimated()}
      value={(category) ? JSON.parse(category) : false}
      onChange={handleCategoryChange}
      options={categoryOptions}
      placeholder={__('Select', 'design-islands')}
    />
  );

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'design-islands')}
          initialOpen={true}>
          <div className="di-panel-group">
            <div className="di-label-mce-class">
              {__('Choose authors', 'design-islands')}
            </div>
            {categorySelectElement}
          </div>
        </PanelBody>
        <PanelBody
          title={__('Post Details', 'design-islands')}
          initialOpen={true}>
          {(postTitle !== '') && <div className="di-panel-group">
            <div className="di-label-mce-class">
              {__('Post title', 'design-islands')}
            </div>
            <div className="featured-title">
              {postTitle}
            </div>
          </div>}
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
};

export default BlockOptions;
