import {Fragment} from 'react';
import {AppConsumer} from '../containers/AppContext';
import QuestionHeader from '../parts/QuestionHeader';
import {
  MainQuestion,
  AnswersParent,
  Answer,
} from '../components';

const QuestionConsumer = (props) => {
  const {
    values: {
      questionData: {
        answers,
        direction,
        question,
        theme: questionTheme,
        title,
      },
      handleAnswerChange,
      selectedAnswer,
    },
  } = props;

  const answersElements = answers.map((value, index) => {
    const {correct, text} = value;
    const {id} = selectedAnswer;
    const state = (index + 1 === id) ? 1 : 0;
    return (
      <Answer
        key={index}
        onClick={handleAnswerChange}
        correct={correct}
        theme={questionTheme}
        number={index + 1}
        state={state}
      >
        {text}
      </Answer>
    );
  });




  return (
    <Fragment>
      <QuestionHeader
        title={title}
      />
      <MainQuestion>
        {question}
      </MainQuestion>
      <AnswersParent
        rows={direction}
      >
        {answersElements}
      </AnswersParent>
    </Fragment>
  );
};

const Question = ({questionData}) => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          selectedAnswer,
        },
        dataStore: {
          handleAnswerChange,
        },
      } = value;
      return (
        <QuestionConsumer
          values={{
            questionData,
            handleAnswerChange,
            selectedAnswer,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Question;
