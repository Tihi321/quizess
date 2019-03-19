import Select from 'react-select';
import {Fragment} from '@wordpress/element';
import {
  RangeControl,
  PanelRow,
  FormToggle,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {
  TextElement,
} from '../../../../elements';

function BlockElements(props) {
  const {
    attributes: {
      useTimer,
      timer,
      welcomeMessage,
      successMessage,
      failureMessage,
      theme,
      aboutField,
    },
    dispatchAttributesStore: {
      handleTimerChange,
      handleUseTimerChange,
      handleSuccessMessageChange,
      handleFailureMessageChange,
      handleWelcomeMessageChange,
      handleThemeChange,
      handleAboutChange,
    },
  } = props;

  const themeSelectElement = (
    <Fragment>
      <div className="qz-label-mce-class">
        {__('Default theme', 'quizess')}
      </div>
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
      <div className="qz-help-mce-class">
        {__('Default theme will affect buttons ( eg. submit, start ) and text, light theme for light background color & dark theme for dark background color', 'quizess')}
      </div>
    </Fragment>
  );

  /* eslint-disable */
    const welcomeMessageElement = (
      <Fragment>
        <div className="qz-label-mce-class">
          {__('Welcome message', 'quizess')}
        </div>
        <TextElement
            styleReset={true}
            outputType='text'
            className="qz-input-mce-class"
            value={welcomeMessage}
            onChange={(message) => handleWelcomeMessageChange(message)}
            maxChars={100}
            maxRows={4}
            warning={true}
            single={true}
            init={{
              selection_toolbar:false,
              insert_toolbar: false,
            }}
          />
        <div className="qz-help-mce-class">
          {__('Choose welcome message for quiz', 'quizess')}
        </div>
      </Fragment>
    );
    const successMessageElement = (
      <Fragment>
        <div className="qz-label-mce-class">
          {__('Success message', 'quizess')}
        </div>
        <TextElement
            styleReset={true}
            outputType='text'
            className="qz-input-mce-class"
            value={successMessage}
            onChange={(message) => handleSuccessMessageChange(message)}
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
          {__('Choose success message for question', 'quizess')}
        </div>
      </Fragment>
    );
    const failureMessageElement = (
      <Fragment>
        <div className="qz-label-mce-class">
          {__('Failure message', 'quizess')}
        </div>
        <TextElement
            styleReset={true}
            outputType='text'
            className="qz-input-mce-class"
            value={failureMessage}
            onChange={(message) => handleFailureMessageChange(message)}
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
          {__('Choose failure message for question', 'quizess')}
        </div>
      </Fragment>
    );
    const aboutFieldElement = (
      <Fragment>
        <div className="qz-label-mce-class">
          {__('About section', 'quizess')}
        </div>
        <TextElement
            styleReset={true}
            outputType='text'
            className="qz-input-mce-class"
            value={aboutField}
            onChange={(about) => handleAboutChange(about)}
            maxChars={1000}
            maxRows={10}
            warning={true}
            tagName="p"
          />
        <div className="qz-help-mce-class">
          {__('Write something about this quiz', 'quizess')}
        </div>
      </Fragment>
    );
    /* eslint-enable */

  const timerElement = (
    <Fragment>
      <PanelRow>
        {__('Use timer', 'quizess')}
        <FormToggle
          checked={useTimer}
          onChange={() => handleUseTimerChange(!useTimer)}
        />
      </PanelRow>
      {(useTimer) && <RangeControl
        className="qz-full-width"
        value={timer}
        onChange={(value) => handleTimerChange(value)}
        min={1}
        max={100}
      />}
    </Fragment>
  );

  return (
    <Fragment>
      <div className="bg-label">
        {__('Options', 'quizess')}
      </div>
      <div className="qz-help-mce-class is-centered">
        {__('Some of the global options for this quiz', 'quizess')}
      </div>
      <div className="block-options">
        <div className="qz-panel-group">
          {themeSelectElement}
        </div>
        <div className="qz-panel-group">
          {timerElement}
        </div>
        <div className="qz-panel-group">
          {welcomeMessageElement}
          {successMessageElement}
          {failureMessageElement}
        </div>
        <div className="qz-panel-group">
          {aboutFieldElement}
        </div>
      </div>
    </Fragment>
  );
}

export default BlockElements;
