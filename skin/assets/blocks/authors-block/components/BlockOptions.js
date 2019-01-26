import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {
  PanelBody,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

function BlockOptions(props) {
  const {
    attributes: {
      backgroundColor,
      authors,
    },
    dispatchAttributesStore: {
      handleOnBackgroundChange,
      handleAuthorsOnChange,
    },
    posts,
  } = props;

  const colorSettings = [
    {
      value: backgroundColor,
      onChange: handleOnBackgroundChange,
      label: __('Background Color', 'quizess'),
    },
  ];

  let isDisabled = true;
  let options = [];

  if (posts) {
    isDisabled = false;
    options = posts.map((post) => {
      return {
        value: post.id,
        label: post.title.rendered,
        url: post._links.self[0].href,
        imageUrl: post.blocks[0].attrs.url,
        alt: (post.blocks[0].attrs.alt) ? post.blocks[0].attrs.alt : post.blocks[0].attrs.title,
      };
    });
  }


  const themeSelectElement = (
    <Select
      className="authors-select"
      isDisabled={isDisabled}
      isSearchable
      isMulti
      closeMenuOnSelect={false}
      components={makeAnimated()}
      value={(authors) ? JSON.parse(authors) : false}
      onChange={handleAuthorsOnChange}
      options={options}
      placeholder={__('Select', 'quizess')}
    />
  );

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          <div className="di-panel-group">
            <div className="di-label-mce-class">
              {__('Choose authors', 'quizess')}
            </div>
            {themeSelectElement}
          </div>
        </PanelBody>
        <PanelColorSettings
          title={__('Color Settings', 'quizess')}
          initialOpen={false}
          colorSettings={colorSettings}
        />
      </InspectorControls>
    </Fragment>
  );
}

export default BlockOptions;
