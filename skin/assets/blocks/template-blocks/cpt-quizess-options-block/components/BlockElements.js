import {Fragment} from '@wordpress/element';
import {
  RangeControl,
  PanelRow,
  FormToggle,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import TextElement from '../../../elements/TextElement';

function BlockElements(props) {
  const {
    attributes: {
      useTimer,
      timer,
      successMessage,
      failureMessage,
    },
    dispatchAttributesStore: {
      handleTimerChange,
      handleUseTimerChange,
      handleSuccessMessageChange,
      handleFailureMessageChange,
    },
  } = props;

  /* eslint-disable */
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
      <div className="block-options">
        <div className="qz-panel-group">
          {timerElement}
        </div>
        <div className="qz-panel-group">
          {successMessageElement}
          {failureMessageElement}
        </div>
      </div>
    </Fragment>
  );
}

export default BlockElements;
