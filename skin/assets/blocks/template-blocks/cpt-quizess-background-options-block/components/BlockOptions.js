import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {__} from '@wordpress/i18n';

function BlockOptions(props) {
  const {
    attributes: {
      backgroundColor,
    },
    dispatchAttributesStore: {
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

  return (
    <Fragment>
      <InspectorControls>
        <PanelColorSettings
          title={__('Background Color', 'quizess')}
          initialOpen={true}
          colorSettings={colorSettings}
        />
      </InspectorControls>
    </Fragment>
  );
}

export default BlockOptions;
