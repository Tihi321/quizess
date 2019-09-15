import {Fragment, useContext} from 'react';
import {__} from '@wordpress/i18n';
import Question from './Question';
import Explanation from './Explanation';
import {AppContext} from '../containers/AppContext';
import {WideButton, Placeholder} from '../../../components';

const Router = ({
  questionData: {
    answers,
    question,
    explanationMedia,
    explanationText,
    explanationType,
  },
  questionData,
}) => {
  const {
    values: {
      data: {
        options: {
          theme,
        },
      },
      showExplanation,
      selectedAnswer: {
        id,
      },
      submitedAnswer,
    },
    dataStore: {
      handleSubmitChange,
      handleExplanationChange,
    },
  } = useContext(AppContext);

  if (!answers || !question) {
    return (
      <Placeholder type="warning">
        {__('This question is incomplete', 'quizess')}
      </Placeholder>
    );
  }

  const explanationDataCheck = !!(explanationMedia || explanationText) || false;

  const explanationButtonElement = (
    <WideButton
      theme={theme}
      onClick={handleExplanationChange}
      disabled={false}
      featured={true}
    >
      {(!showExplanation) ? __('Show Expplanation', 'quizess') : __('Hide Expplanation', 'quizess')}
    </WideButton>
  );

  const wideButtonText = (!submitedAnswer) ? __('Submit', 'quizess') : __('Next Question', 'quizess');

  const questionElement = (
    <Question
      questionData={questionData}
    />
  );

  const explanationElement = (
    <Explanation
      type={explanationType}
      text={explanationText}
      media={explanationMedia}
    />
  );

  const renderElement = (!showExplanation) ? questionElement : explanationElement;

  return (
    <Fragment>
      {renderElement}
      <div className="modal__footer">
        {(submitedAnswer && explanationDataCheck) && explanationButtonElement}
        <WideButton
          theme={theme}
          onClick={handleSubmitChange}
          disabled={(id === 0) || false}
          featured={false}
        >
          {wideButtonText}
        </WideButton>
      </div>
    </Fragment>
  );
};

export default Router;
