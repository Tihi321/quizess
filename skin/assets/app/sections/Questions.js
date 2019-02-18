import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import Router from './Router';

const QuestionsConsumer = (props) => {
  const {
    values: {
      questionsTotal,
      currentQuestion,
      questions,
    },
  } = props;

  if (!Array.isArray(questions) || !questions.length) {
    return (
      <div>
        {__('Nothing to see here, this quiz has no questions !!!', 'quizess')}
      </div>
    );
  }

  if (currentQuestion + 1 === questionsTotal) {
    return (
      <div>
        {__('End !!!', 'quizess')}
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
          data: {
            questions,
          },
        },
      } = value;
      return (
        <QuestionsConsumer
          values={{
            questionsTotal,
            currentQuestion,
            questions,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Questions;
