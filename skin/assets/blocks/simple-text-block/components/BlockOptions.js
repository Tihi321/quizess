import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  BlockControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {Toolbar} from '@wordpress/components';
import {__} from '@wordpress/i18n';

function BlockOptions(props) {
  const {
    titlePosition,
    backgroundColor,
    dispatchAttributesStore: {
      handleTitlePosition,
      handleOnBackgroundChange,
    },
  } = props;

  const toolbarControls = [
    {
      icon: 'align-pull-left',
      title: __('Show Title on left', 'quizess'),
      isActive: titlePosition === 'left',
      onClick: () => handleTitlePosition('left'),
    },
    {
      icon: 'align-pull-right',
      title: __('Show Title on right', 'quizess'),
      isActive: titlePosition === 'right',
      onClick: () => handleTitlePosition('right'),
    },
  ];

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
          title={__('Color Settings', 'quizess')}
          initialOpen={false}
          colorSettings={colorSettings}
        />
      </InspectorControls>
      <BlockControls>
        <Toolbar controls={toolbarControls} />
      </BlockControls>
    </Fragment>
  );
}

export default BlockOptions;
