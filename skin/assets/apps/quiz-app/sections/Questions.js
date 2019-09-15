import {Fragment, useContext} from 'react';
import {__} from '@wordpress/i18n';
import {AppContext} from '../containers/AppContext';
import Router from './Router';
import {
  Overview,
  Placeholder,
  SubmitMessage,
} from './../../../components';

const Questions = () => {
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
  } = useContext(AppContext);

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

export default Questions;
