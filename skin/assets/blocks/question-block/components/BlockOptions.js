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
import TextElement from '../../elements/TextElement';
import {BlockConsumer} from '../containers/BlockContext';

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

  const columnsSelectElement = (
    <Select
      className="columns-select"
      closeMenuOnSelect={true}
      value={(rows) ? JSON.parse(rows) : {value: 'row', label: 'Row'}}
      onChange={handleRowsChange}
      options={[
        {value: 'row', label: 'Row'},
        {value: 'columns', label: 'Columns'},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

  const themeSelectElement = (
    <Select
      className="columns-select"
      closeMenuOnSelect={true}
      value={(theme) ? JSON.parse(theme) : {value: 'dark', label: 'Dark'}}
      onChange={handleThemeChange}
      options={[
        {value: 'light', label: 'Light'},
        {value: 'dark', label: 'Dark'},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

  const explanationCheckElement = (
    <Fragment>
      <PanelRow>
        {__('Show Explanation', 'quizess')}
        <FormToggle
          checked={showExplanation}
          onChange={() => handleExplanationChecked(!showExplanation)}
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
      <div className="qz-panel-group qz-panel-group--big">
        <div className="qz-option-title-class">
          {__('Style Options', 'design-islands')}
        </div>
        <div className="qz-panel-group">
          <div className="qz-label-mce-class">
            {__('Type', 'quizess')}
          </div>
          {columnsSelectElement}
          <div className="qz-help-mce-class">
            {__('Choose weather place answers in row or 2 columns.', 'quizess')}
          </div>
        </div>
        <div className="qz-panel-group">
          <div className="qz-label-mce-class">
            {__('Theme', 'quizess')}
          </div>
          {themeSelectElement}
          <div className="qz-help-mce-class">
            {__('Theme color for answers', 'quizess')}
          </div>
        </div>
      </div>
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
              {__('Explanation Options', 'design-islands')}
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
