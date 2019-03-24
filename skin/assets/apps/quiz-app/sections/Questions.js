import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import Router from './Router';
import {
  Overview,
  Placeholder,
  SubmitMessage,
} from './../../../components';

const QuestionsConsumer = (props) => {
  const {
    questionsTotal,
    currentQuestion,
    correctAnswers,
    questionStats,
    questions,
    theme,
    showMessage,
    message,
    successMessage,
    scoresSubmited,
    singleSubmit,
    handleTryAgain,
    handleSubmitScore,
    handleResetMessage,
  } = props;

  if (!Array.isArray(questions) || !questions.length) {
    return (
      <Placeholder type="warning">
        {__('Nothing to see here, this quiz has no questions !!!', 'quizess')}
      </Placeholder>
    );
  }

  if (currentQuestion + 1 > questionsTotal) {
    if (!scoresSubmited) {
      handleSubmitScore();
    }
    return (
      <Fragment>
        <Overview
          theme={theme}
          onClick={handleTryAgain}
          questionsTotal={questionsTotal}
          correctAnswers={correctAnswers}
          questionStats={questionStats}
          playOnce={scoresSubmited && singleSubmit}
        />
        <SubmitMessage
          showMessage={showMessage}
          message={message}
          successMessage={successMessage}
          handleResetMessage={handleResetMessage}
        />
      </Fragment>
    );
  }



  return (
    <Router
      questionData={questions[currentQuestion]}
    />
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
          singleSubmit,
          showMessage,
          message,
          successMessage,
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
          handleResetMessage,
        },
      } = value;
      return (
        <QuestionsConsumer
          questionsTotal={questionsTotal}
          currentQuestion={currentQuestion}
          questions={questions}
          theme={theme}
          showMessage={showMessage}
          successMessage={successMessage}
          message={message}
          scoresSubmited={scoresSubmited}
          singleSubmit={singleSubmit}
          questionStats={questionStats}
          correctAnswers={correctAnswers}
          handleTryAgain={handleTryAgain}
          handleSubmitScore={handleSubmitScore}
          handleResetMessage={handleResetMessage}
        />
      );
    }}
  </AppConsumer>
);

export default Questions;
