import {Fragment, useContext} from 'react';
import {RawHTML} from '@wordpress/element';
import {AppContext} from '../containers/AppContext';
import {ExplanationPreview} from '../../../components';

const Explanation = ({
  type,
  text,
  media,
}) => {
  const {
    values: {
      selectedAnswer,
      data: {
        options: {
          failureMessage,
          successMessage,
        },
      },
    },
  } = useContext(AppContext);

  const {correct} = selectedAnswer;
  const messageText = (correct) ? successMessage : failureMessage;
  const messageClass = (correct) ? 'success' : 'fail';

  const textElement = (
    <RawHTML className="quiz__explanation">
      {text}
    </RawHTML>
  );

  const mediaPrevieElement = (
    <ExplanationPreview
      type={type}
      media={media}
    />
  );

  return (
    <Fragment>
      <RawHTML className={`quiz__message quiz__message--${messageClass}`} >
        {messageText}
      </RawHTML>
      {(text) && textElement}
      {(type && media) && mediaPrevieElement}
    </Fragment>
  );
};

export default Explanation;
