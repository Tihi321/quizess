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
import Select from 'react-select';
import {
  TextElement,
} from '../../../elements';
import {BlockConsumer} from '../containers/BlockContext';
import StyleOptions from '../../components/toolbars/style-options';

function BlockOptionsConsumer(props) {
  const {
    values: {
      backgroundColor,
      fontColor,
      rows,
      theme,
      explanationType,
      showExplanation,
      title,
      templateBlock,
      handleOnBackgroundChange,
      handleOnFontColorChange,
      handleRowsChange,
      handleExplanationChecked,
      handleExplanationTypeChange,
      handleTitleChange,
      handleThemeChange,
    },
  } = props;

  const showExplanationChecked = (typeof showExplanation !== 'undefined') ? showExplanation : false;

  const explanationCheckElement = (
    <Fragment>
      <PanelRow>
        {__('Show Explanation', 'quizess')}
        <FormToggle
          checked={showExplanationChecked}
          onChange={() => handleExplanationChecked(!showExplanationChecked)}
        />
      </PanelRow>
    </Fragment>
  );

  const explanationTypeSelect = (
    <Select
      className="columns-select"
      closeMenuOnSelect={true}
      value={(explanationType) ? JSON.parse(explanationType) : {value: 'none', label: 'None'}}
      onChange={handleExplanationTypeChange}
      options={[
        {value: 'none', label: __('None', 'quizess')},
        {value: 'image', label: __('Image', 'quizess')},
        {value: 'video', label: __('Video', 'quizess')},
        {value: 'youtube', label: __('Youtube', 'quizess')},
        {value: 'lottie', label: __('Lottie', 'quizess')},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

/* eslint-disable */
  const titleElement = (
    <TextElement
        styleReset={true}
        outputType='text'
        className="qz-input-mce-class"
        value={title}
        onChange={(title) => handleTitleChange(title)}
        maxChars={100}
        maxRows={1}
        warning={false}
        single={true}
        init={{
          selection_toolbar:false,
          insert_toolbar: false,
        }}
      />
  );
  /* eslint-enable */

  const customQuestionElements = (
    <Fragment>
      <div className="qz-panel-group qz-panel-group--big">
        <div className="qz-panel-group">
          <div className="qz-label-mce-class">
            {__('Title', 'quizess')}
          </div>
          {titleElement}
          <div className="qz-help-mce-class">
            {__('Enter optional question title.', 'quizess')}
          </div>
        </div>
      </div>
      <StyleOptions
        rows={rows}
        theme={theme}
        handleRowsChange={handleRowsChange}
        handleThemeChange={handleThemeChange}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          {(!templateBlock) && customQuestionElements}
          <div className="qz-panel-group qz-panel-group--big">
            <div className="qz-option-title-class">
              {__('Explanation Options', 'quizess')}
            </div>
            {explanationCheckElement}
            <div className="qz-help-mce-class">
              {__('Choose weather to show explanation slide after question', 'quizess')}
            </div>
            {(showExplanation) &&
              <Fragment>
                <div className="qz-label-mce-class">
                  {__('Type', 'quizess')}
                </div>
                {explanationTypeSelect}
                <div className="qz-help-mce-class">
                  {__('Choose explanation media type.', 'quizess')}
                </div>
              </Fragment>
            }
          </div>
        </PanelBody>
        {(!templateBlock) &&
          <Fragment>
            <PanelColorSettings
              title={__('Font Settings', 'quizess')}
              initialOpen={false}
              colorSettings={[
                {
                  value: fontColor,
                  onChange: handleOnFontColorChange,
                  label: __('Font Color', 'quizess'),
                },
              ]}
            />
            <PanelColorSettings
              title={__('Background Settings', 'quizess')}
              initialOpen={false}
              colorSettings={[
                {
                  value: backgroundColor,
                  onChange: handleOnBackgroundChange,
                  label: __('Background Color', 'quizess'),
                },
              ]}
            />
          </Fragment>
        }
      </InspectorControls>
    </Fragment>
  );
}

const BlockOptions = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            backgroundColor,
            fontColor,
            rows,
            explanationType,
            showExplanation,
            title,
            templateBlock,
            theme,
          },
        },
        attributesStore: {
          handleOnBackgroundChange,
          handleOnFontColorChange,
          handleRowsChange,
          handleExplanationChecked,
          handleExplanationTypeChange,
          handleTitleChange,
          handleThemeChange,
        },
      } = value;
      return (
        <BlockOptionsConsumer
          values={{
            backgroundColor,
            fontColor,
            rows,
            theme,
            explanationType,
            showExplanation,
            title,
            templateBlock,
            handleOnBackgroundChange,
            handleOnFontColorChange,
            handleRowsChange,
            handleExplanationChecked,
            handleExplanationTypeChange,
            handleTitleChange,
            handleThemeChange,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default BlockOptions;
