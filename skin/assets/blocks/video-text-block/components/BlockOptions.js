import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
} from '@wordpress/editor';
import {
  PanelBody,
  PanelRow,
  FormToggle,
  SelectControl,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';

function BlockOptions(props) {
  const {
    attributes: {
      bodyContentChecked,
      titleChecked,
      theme,
      sourceType,
    },
    dispatchAttributesStore: {
      handleTitleChecked,
      handleBodyContentChecked,
      handleThemeChange,
      handleSourceTypeChange,
    },
  } = props;

  const contentCheckElement = (
    <Fragment>
      <PanelRow>
        {__('Title text', 'quizess')}
        <FormToggle
          checked={titleChecked}
          onChange={() => handleTitleChecked(!titleChecked)}
        />
      </PanelRow>
      <PanelRow>
        {__('Body text', 'quizess')}
        <FormToggle
          checked={bodyContentChecked}
          onChange={() => handleBodyContentChecked(!bodyContentChecked)}
        />
      </PanelRow>
    </Fragment>
  );

  const themeSelectElement = (
    <SelectControl
      label={__('Select theme:', 'quizess')}
      value={theme}
      onChange={handleThemeChange}
      options={[
        {value: 'light-theme', label: 'Light Theme'},
        {value: 'dark-theme', label: 'Dark Theme'},
      ]}
    />
  );

  const sourceTypeSelectElement = (
    <SelectControl
      label={__('Select source:')}
      value={sourceType}
      onChange={handleSourceTypeChange}
      options={[
        {value: 'type-file', label: 'Video File'},
        {value: 'type-youtube', label: 'Youtube'},
      ]}
    />
  );

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          <div className="qz-panel-group">
            {sourceTypeSelectElement}
          </div>
          <div className="qz-panel-group">
            {themeSelectElement}
          </div>
          <div className="qz-panel-group">
            {contentCheckElement}
          </div>
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
}

export default BlockOptions;
