import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import Router from './Router';
import {Overview, Placeholder} from './../../../components';

const QuestionsConsumer = (props) => {
  const {
    questionsTotal,
    currentQuestion,
    correctAnswers,
    questionStats,
    questions,
    theme,
    scoresSubmited,
    handleTryAgain,
    handleSubmitScore,
  } = props;

  if (!Array.isArray(questions) || !questions.length) {
    return (
      <Placeholder>
        {__('Nothing to see here, this quiz has no questions !!!', 'quizess')}
      </Placeholder>
    );
  }

  if (currentQuestion + 1 > questionsTotal) {
    if (!scoresSubmited) {
      handleSubmitScore();
    }
    return (
      <Overview
        theme={theme}
        onClick={handleTryAgain}
        questionsTotal={questionsTotal}
        correctAnswers={correctAnswers}
        questionStats={questionStats}
      />
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
          scoresSubmited,
          data: {
            questions,
            options: {
              theme,
            },
          },
        },
        dataStore: {
          handleTryAgain,
          handleSubmitScore,
        },
      } = value;
      return (
        <QuestionsConsumer
          questionsTotal={questionsTotal}
          currentQuestion={currentQuestion}
          questions={questions}
          theme={theme}
          scoresSubmited={scoresSubmited}
          questionStats={questionStats}
          correctAnswers={correctAnswers}
          handleTryAgain={handleTryAgain}
          handleSubmitScore={handleSubmitScore}
        />
      );
    }}
  </AppConsumer>
);

export default Questions;
