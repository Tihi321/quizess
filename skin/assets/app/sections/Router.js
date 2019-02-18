import classnames from 'classnames';
import {__} from '@wordpress/i18n';
import Question from './Question';
import Explanation from './Explanation';
import {AppConsumer} from '../containers/AppContext';
import {NextButton} from '../components';

const RouterConsumer = (props) => {
  const {
    values: {
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
      submitedAnswer,
      selectedAnswer: {
        id,
      },
    },
  } = props;

  console.log(questionData);

  if (!answers || !question) {
    return (
      <div>
        {__('This question is incomplete', 'quizess')}
      </div>
    );
  }


  const questionClasses = classnames(
    'quiz',
    `quiz--${theme}`,
  );

  const nextButtonText = (!submitedAnswer) ? __('Submit', 'quizess') : __('Next Question', 'quizess');

  return (
    <div
      className={questionClasses}
    >
      <Question
        questionData={questionData}
      />
      <div className="quiz__footer">
        <NextButton
          theme={theme}
          onClick={handleSubmitChange}
          disabled={(id === 0) || false}
          featured={false}
        >
          {nextButtonText}
        </NextButton>
      </div>
    </div>
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
        },
      } = value;
      return (
        <RouterConsumer
          values={{
            theme,
            questionData,
            showExplanation,
            selectedAnswer,
            handleSubmitChange,
            submitedAnswer,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Router;
