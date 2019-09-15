import {Fragment, useContext} from 'react';
import {AppContext} from '../containers/AppContext';
import QuestionHeader from '../parts/QuestionHeader';
import {
  MainQuestion,
  AnswersParent,
  Answer,
} from '../../../components';

const Question = ({
  questionData: {
    answers,
    direction,
    question,
    theme: questionTheme,
    title,
  },
}) => {
  const {
    values: {
      selectedAnswer,
      submitedAnswer,
    },
    dataStore: {
      handleAnswerChange,
    },
  } = useContext(AppContext);

  const answersElements = answers.map((value, index) => {
    const {correct, text} = value;
    const {id} = selectedAnswer;
    const selected = (index + 1 === id) ? 1 : 0;
    const correctAnswer = (correct) ? 2 : 3;
    const state = (submitedAnswer) ? correctAnswer : 1;
    return (
      <Answer
        key={index}
        onClick={(!submitedAnswer) ? handleAnswerChange : false}
        correct={correct}
        theme={questionTheme}
        number={index + 1}
        state={(selected) ? state : 0}
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

export default Question;
