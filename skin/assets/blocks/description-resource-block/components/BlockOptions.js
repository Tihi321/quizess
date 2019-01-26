import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {
  PanelBody,
  PanelRow,
  FormToggle,
  SelectControl,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import TextElement from '../../elements/TextElement';

function BlockOptions(props) {
  const {
    attributes: {
      backgroundColor,
      linkText,
      link,
      customDomain,
      useCustomDomain,
      resource,
      customFileType,
      useCustomFileType,
    },
    dispatchAttributesStore: {
      handleOnBackgroundChange,
      handleLinkTextOnChange,
      handleLinkOnChange,
      handleCustomDomainOnChange,
      handleUseCustomDomainOnChange,
      handleResourceOnChange,
      handleCustomFileTypeOnChange,
      handleUseCustomFileTypeOnChange,
    },
  } = props;

  const colorSettings = [
    {
      value: backgroundColor,
      onChange: handleOnBackgroundChange,
      label: __('Background Color', 'quizess'),
    },
  ];

  const resourceSelectElement = (
    <SelectControl
      label={__('Select type:', 'quizess')}
      value={resource}
      onChange={handleResourceOnChange}
      options={[
        {value: 'link-type', label: 'Link'},
        {value: 'file-type', label: 'File'},
      ]}
    />
  );

  /* eslint-disable */
    const linkElement = (
      <TextElement
        styleReset={true}
        className="di-input-mce-class"
        value={link}
        onChange={(link) => handleLinkOnChange(link)}
        maxChars={30}
        maxRows={1}
        warning={false}
        single={true}
        init={{
          selection_toolbar: false,
          insert_toolbar: false,
        }}
      />
    );
    const customFileTypeElement = (
      <TextElement
        styleReset={true}
        outputType="text"
        className="di-input-mce-class"
        value={customFileType}
        onChange={(customFileType) => handleCustomFileTypeOnChange(customFileType)}
        maxChars={30}
        maxRows={1}
        warning={false}
        single={true}
        init={{
          selection_toolbar: false,
          insert_toolbar: false,
        }}
      />
    );
    const customDomainElement = (
      <TextElement
        styleReset={true}
        outputType="text"
        className="di-input-mce-class"
        value={customDomain}
        onChange={(customDomain) => handleCustomDomainOnChange(customDomain)}
        maxChars={30}
        maxRows={1}
        warning={false}
        single={true}
        init={{
          selection_toolbar: false,
          insert_toolbar: false,
        }}
      />
    );
    const linkTextElement = (
      <TextElement
        styleReset={true}
        className="di-input-mce-class"
        value={linkText}
        onChange={(linkText) => handleLinkTextOnChange(linkText)}
        maxChars={50}
        maxRows={1}
        warning={false}
        single={true}
        init={{
          selection_toolbar:
          'bold italic uppercase | removeformat',
          insert_toolbar: false,
        }}
      />
    );
    /* eslint-enable */

  const useCustomDomainElement = (
    <Fragment>
      <PanelRow>
        {__('Custom domain', 'quizess')}
        <FormToggle
          checked={useCustomDomain}
          onChange={() => handleUseCustomDomainOnChange(!useCustomDomain)}
        />
      </PanelRow>
    </Fragment>
  );

  const useCustomFileTypeElement = (
    <Fragment>
      <PanelRow>
        {__('Custom file type', 'quizess')}
        <FormToggle
          checked={useCustomFileType}
          onChange={() => handleUseCustomFileTypeOnChange(!useCustomFileType)}
        />
      </PanelRow>
    </Fragment>
  );

  const linkElements = (
    <Fragment>
      <div className="di-panel-group">
        <div className="di-label-mce-class">
          {__('Link Text', 'quizess')}
        </div>
        {linkTextElement}
      </div>
      <div className="di-panel-group">
        <div className="di-label-mce-class">
          {__('Link', 'quizess')}
        </div>
        {linkElement}
      </div>
      <div className="di-panel-group">
        {useCustomDomainElement}
        {customDomainElement}
      </div>
    </Fragment>
  );

  const fileElements = (
    <Fragment>
      <div className="di-panel-group">
        {useCustomFileTypeElement}
        {customFileTypeElement}
      </div>
    </Fragment>
  );


  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          <div className="di-panel-group">
            {resourceSelectElement}
          </div>
          {(resource === 'link-type') && linkElements}
          {(resource === 'file-type') && fileElements}
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
