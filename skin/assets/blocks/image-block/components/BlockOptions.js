import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {
  PanelBody,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import TextElement from '../../elements/TextElement';

function BlockOptions(props) {
  const {
    attributes: {
      mediaAlt,
      backgroundColor,
    },
    dispatchAttributesStore: {
      handleOnMediaAltChange,
      handleOnBackgroundChange,
    },
  } = props;

  const colorSettings = [
    {
      value: backgroundColor,
      onChange: handleOnBackgroundChange,
      label: __('Background Color', 'quizess'),
    },
  ];

  /* eslint-disable */
  const mediaAltElement = (
    <Fragment>
      <div className="di-label-mce-class">
        {__('Alt Text (Alternative Text)', 'quizess')}
      </div>
      <TextElement
        styleReset={true}
        outputType='text'
        className="di-input-mce-class"
        value={mediaAlt}
        onChange={(mediaAlt) => handleOnMediaAltChange(mediaAlt)}
        maxChars={100}
        maxRows={1}
        warning={false}
        single={true}
        init={{
          selection_toolbar: false,
          insert_toolbar: false,
        }}
      />
      <div className="di-help-mce-class">
        {__('Alternative text describes your image to people who can’t see it. Add a short description with its key details.', 'quizess')}
      </div>
    </Fragment>
  );
  /* eslint-enable */

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          <div className="di-panel-group">
            {mediaAltElement}
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
