import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  BlockControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {
  Toolbar,
  RangeControl,
  PanelBody,
  PanelRow,
  FormToggle,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import TextElement from '../../elements/TextElement';

function BlockOptions(props) {
  const {
    attributes: {
      hoursWorked,
      mediaPosition,
      mediaAlt,
      backgroundColor,
      hoursChecked,
      fontsChecked,
      fontsUsed,
      bodyContentChecked,
      bottomContentChecked,
    },
    dispatchAttributesStore: {
      handleMediaPosition,
      handleOnMediaAltChange,
      handleOnBackgroundChange,
      handleHoursRange,
      handleHoursChecked,
      handleFontsUsed,
      handleFontsChecked,
      handleBodyContentChecked,
      handleBottomContentChecked,
    },
  } = props;

  const toolbarControls = [
    {
      icon: 'align-pull-left',
      title: __('Show Image on left', 'quizess'),
      isActive: mediaPosition === 'left',
      onClick: () => handleMediaPosition('left'),
    },
    {
      icon: 'align-pull-right',
      title: __('Show Image on right', 'quizess'),
      isActive: mediaPosition === 'right',
      onClick: () => handleMediaPosition('right'),
    },
  ];

  const colorSettings = [
    {
      value: backgroundColor,
      onChange: handleOnBackgroundChange,
      label: __('Background Color', 'quizess'),
    },
  ];

  const hourseRangeElement = (
    <Fragment>
      <PanelRow>
        {__('Hours worked', 'quizess')}
        <FormToggle
          checked={hoursChecked}
          onChange={() => handleHoursChecked(!hoursChecked)}
        />
      </PanelRow>
      <RangeControl
        className="qz-full-width"
        value={hoursWorked}
        onChange={(value) => handleHoursRange(value)}
        min={1}
        max={100}
      />
    </Fragment>
  );

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
          value={mediaAlt}
          onChange={(mediaAlt) => handleOnMediaAltChange(mediaAlt)}
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
  const fontsUsedElement = (
    <Fragment>
      <PanelRow>
        {__('Fonts used', 'quizess')}
        <FormToggle
          checked={fontsChecked}
          onChange={() => handleFontsChecked(!fontsChecked)}
        />
      </PanelRow>
      <PanelRow>
        <TextElement
          styleReset={true}
          outputType='text'
          className="qz-input-mce-class"
          value={fontsUsed}
          onChange={(fonts) => handleFontsUsed(fonts)}
          maxChars={50}
          maxRows={1}
          warning={false}
          single={true}
          init={{
            selection_toolbar:false,
            insert_toolbar: false,
          }}
        />
      </PanelRow>
    </Fragment>
  );
  /* eslint-enable */

  const contentCheckElement = (
    <Fragment>
      <PanelRow>
        {__('Body text', 'quizess')}
        <FormToggle
          checked={bodyContentChecked}
          onChange={() => handleBodyContentChecked(!bodyContentChecked)}
        />
      </PanelRow>
      <PanelRow>
        {__('Bottom text', 'quizess')}
        <FormToggle
          checked={bottomContentChecked}
          onChange={() => handleBottomContentChecked(!bottomContentChecked)}
        />
      </PanelRow>
    </Fragment>
  );

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          <div className="qz-panel-group">
            {mediaAltElement}
          </div>
          <div className="qz-panel-group">
            {contentCheckElement}
          </div>
          <div className="qz-panel-group">
            {hourseRangeElement}
          </div>
          <div className="qz-panel-group">
            {fontsUsedElement}
          </div>
        </PanelBody>
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
