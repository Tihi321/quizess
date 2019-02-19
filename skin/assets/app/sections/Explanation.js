import {Fragment} from 'react';
import {RawHTML} from '@wordpress/element';
import {AppConsumer} from '../containers/AppContext';
import {ExplanationPreview} from '../components';

const ExplanationConsumer = (props) => {
  const {
    values: {
      selectedAnswer,
      failureMessage,
      successMessage,
      type,
      text,
      media,
    },
  } = props;

  const {correct} = selectedAnswer;
  const messageText = (correct) ? successMessage : failureMessage;

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
      <RawHTML className="quiz__message" >
        {messageText}
      </RawHTML>
      {(text) && textElement}
      {(type && media) && mediaPrevieElement}
    </Fragment>
  );
};

const Explanation = ({
  type,
  text,
  media,
}) => (
  <AppConsumer>
    {(value) => {
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
      } = value;
      return (
        <ExplanationConsumer
          values={{
            selectedAnswer,
            failureMessage,
            successMessage,
            type,
            text,
            media,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Explanation;
