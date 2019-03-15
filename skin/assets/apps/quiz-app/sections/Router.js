import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import Question from './Question';
import Explanation from './Explanation';
import {AppConsumer} from '../containers/AppContext';
import {WideButton, Placeholder} from '../../../components';

const RouterConsumer = (props) => {
  const {
    theme,
    showExplanation,
    questionData: {
      answers,
      question,
      explanationMedia,
      explanationText,
      explanationType,
    },
    questionData,
    handleSubmitChange,
    handleExplanationChange,
    submitedAnswer,
    selectedAnswer: {
      id,
    },
  } = props;

  if (!answers || !question) {
    return (
      <Placeholder>
        {__('This question is incomplete', 'quizess')}
      </Placeholder>
    );
  }

  const explanationDataCheck = (!(explanationMedia || explanationText)) || true;

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

const Router = ({questionData}) => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          data: {
            options: {
              theme,
            },
          },
          showExplanation,
          selectedAnswer,
          submitedAnswer,
        },
        dataStore: {
          handleSubmitChange,
          handleExplanationChange,
        },
      } = value;
      return (
        <RouterConsumer
          theme={theme}
          questionData={questionData}
          showExplanation={showExplanation}
          selectedAnswer={selectedAnswer}
          handleSubmitChange={handleSubmitChange}
          submitedAnswer={submitedAnswer}
          handleExplanationChange={handleExplanationChange}
        />
      );
    }}
  </AppConsumer>
);

export default Router;
