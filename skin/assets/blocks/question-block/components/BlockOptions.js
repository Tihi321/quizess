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
      explanationType,
      showExplanation,
      title,
      dontUseTitle,
      handleOnBackgroundChange,
      handleOnFontColorChange,
      handleRowsChange,
      handleExplanationChecked,
      handleExplanationTypeChange,
      handleTitleChange,
    },
  } = props;

  const fontColorSettings = [
    {
      value: fontColor,
      onChange: handleOnFontColorChange,
      label: __('Font Color', 'quizess'),
    },
  ];

  const backgroundColorSettings = [
    {
      value: backgroundColor,
      onChange: handleOnBackgroundChange,
      label: __('Background Color', 'quizess'),
    },
  ];


  const columnsSelectElement = (
    <Select
      className="collumns-select"
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
      className="collumns-select"
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
      <Fragment>
        <div className="di-label-mce-class">
          {__('Title', 'quizess')}
        </div>
        <TextElement
            styleReset={true}
            outputType='text'
            className="di-input-mce-class"
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
        <div className="di-help-mce-class">
          {__('Enter optional question title.', 'quizess')}
        </div>
      </Fragment>
    );
    /* eslint-disable */

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__('Block options', 'quizess')}
          initialOpen={true}>
          {(!dontUseTitle) && titleElement}
          <div className="di-panel-group">
            <div className="di-label-mce-class">
              {__('Choose collumns', 'quizess')}
            </div>
            {columnsSelectElement}
          </div>
          <div className="di-panel-group">
            {explanationCheckElement}
          </div>
          <div className="di-panel-group">
            {explanationTypeSelect}
          </div>
        </PanelBody>
        <PanelColorSettings
          title={__('Font Settings', 'quizess')}
          initialOpen={false}
          colorSettings={fontColorSettings}
        />
        <PanelColorSettings
          title={__('Background Settings', 'quizess')}
          initialOpen={false}
          colorSettings={backgroundColorSettings}
        />
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
            dontUseTitle,
          },
        },
        attributesStore: {
          handleOnBackgroundChange,
          handleOnFontColorChange,
          handleRowsChange,
          handleExplanationChecked,
          handleExplanationTypeChange,
          handleTitleChange,
        },
      } = value;
      return (
        <BlockOptionsConsumer
          values={{
            backgroundColor,
            fontColor,
            rows,
            explanationType,
            showExplanation,
            title,
            dontUseTitle,
            handleOnBackgroundChange,
            handleOnFontColorChange,
            handleRowsChange,
            handleExplanationChecked,
            handleExplanationTypeChange,
            handleTitleChange,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default BlockOptions;
