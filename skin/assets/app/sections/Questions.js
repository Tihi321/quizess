import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import Router from './Router';
import {HallOfFame} from './../components';

const QuestionsConsumer = (props) => {
  const {
    values: {
      questionsTotal,
      currentQuestion,
      correctAnswers,
      questionStats,
      questions,
      theme,
      handleTryAgain,
    },
  } = props;

  if (!Array.isArray(questions) || !questions.length) {
    return (
      <div>
        {__('Nothing to see here, this quiz has no questions !!!', 'quizess')}
      </div>
    );
  }

  if (currentQuestion + 1 > questionsTotal) {
    return (
      <div>
        <HallOfFame
          theme={theme}
          onClick={handleTryAgain}
          questionsTotal={questionsTotal}
          correctAnswers={correctAnswers}
          questionStats={questionStats}
        />
      </div>
    );
  }



  return (
    <Fragment>
      <Router
        questionData={questions[currentQuestion]}
      />
    </Fragment>
  );
};

const Questions = () => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          currentQuestion,
          questionsTotal,
          questionStats,
          correctAnswers,
          data: {
            questions,
            options: {
              theme,
            },
          },
        },
        dataStore: {
          handleTryAgain,
        },
      } = value;
      return (
        <QuestionsConsumer
          values={{
            questionsTotal,
            currentQuestion,
            questions,
            theme,
            questionStats,
            correctAnswers,
            handleTryAgain,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Questions;
