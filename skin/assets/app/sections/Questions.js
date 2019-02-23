import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import Router from './Router';
import {HallOfFame, Placeholder} from './../components';

const QuestionsConsumer = (props) => {
  const {
    questionsTotal,
    currentQuestion,
    correctAnswers,
    questionStats,
    questions,
    theme,
    handleTryAgain,
  } = props;

  if (!Array.isArray(questions) || !questions.length) {
    return (
      <Placeholder>
        {__('Nothing to see here, this quiz has no questions !!!', 'quizess')}
      </Placeholder>
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
          questionsTotal={questionsTotal}
          currentQuestion={currentQuestion}
          questions={questions}
          theme={theme}
          questionStats={questionStats}
          correctAnswers={correctAnswers}
          handleTryAgain={handleTryAgain}
        />
      );
    }}
  </AppConsumer>
);

export default Questions;
