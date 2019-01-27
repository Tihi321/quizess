import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
} from '@wordpress/editor';
import {
  PanelBody,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import TextElement from '../../../elements/TextElement';

function BlockOptions(props) {
  const {
    attributes: {
      alt,
    },
    dispatchAttributesStore: {
      handleOnMediaAltChange,
    },
  } = props;

  /* eslint-disable */
  const mediaAltElement = (
    <Fragment>
      <div className="qz-label-mce-class">
        {__('Alt Text (Alternative Text)', 'quizess')}
      </div>
      <TextElement
          styleReset={true}
          outputType='text'
          className="qz-input-mce-class"
          value={alt}
          onChange={(alt) => handleOnMediaAltChange(alt)}
          maxChars={100}
          maxRows={1}
          warning={false}
          single={true}
          init={{
            selection_toolbar:false,
            insert_toolbar: false,
          }}
        />
      <div className="qz-help-mce-class">
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
          <div className="qz-panel-group">
            {mediaAltElement}
          </div>
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
}

export default BlockOptions;
