import {Fragment} from '@wordpress/element';
import {
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/editor';
import {
  PanelBody,
  PanelRow,
  FormToggle,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import TextElement from '../../elements/TextElement';

function BlockOptions(props) {
  const {
    attributes: {
      backgroundColor,
      showTitle,
      title,
      linkText,
      link,
      customDomain,
      useCustomDomain,
    },
    dispatchAttributesStore: {
      handleOnBackgroundChange,
      handleshowTitle,
      handleTitleOnChange,
      handleLinkTextOnChange,
      handleLinkOnChange,
      handleCustomDomainOnChange,
      handleUseCustomDomainOnChange,
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
    const titleElement = (
      <TextElement
        styleReset={true}
        outputType = "text"
        className="qz-input-mce-class"
        value={title}
        onChange={(title) => handleTitleOnChange(title)}
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
    const linkElement = (
      <TextElement
        styleReset={true}
        className="qz-input-mce-class"
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
    const customDomainElement = (
      <TextElement
        styleReset={true}
        outputType="text"
        className="qz-input-mce-class"
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
        className="qz-input-mce-class"
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

  const showTitleElement = (
    <Fragment>
      <PanelRow>
        {__('Title', 'quizess')}
        <FormToggle
          checked={showTitle}
          onChange={() => handleshowTitle(!showTitle)}
        />
      </PanelRow>
    </Fragment>
  );

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


  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          <div className="qz-panel-group">
            {showTitleElement}
            {titleElement}
          </div>
          <div className="qz-panel-group">
            <div className="qz-label-mce-class">
              {__('Link Text', 'quizess')}
            </div>
            {linkTextElement}
          </div>
          <div className="qz-panel-group">
            <div className="qz-label-mce-class">
              {__('Link', 'quizess')}
            </div>
            {linkElement}
          </div>
          <div className="qz-panel-group">
            {useCustomDomainElement}
            {customDomainElement}
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
