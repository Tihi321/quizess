import QuizComponents from './QuizComponents';

const QuizElement = (props) => {
  const {
    question,
    answers,
    showExplanation,
    explanation,
    explanationType,
    explanationMedia,
  } = props;

  const answersElements = answers.map((answer, index) => {
    return (
      <QuizComponents.AnswerItem
        key={index}
        correct={answer.correct}
      >
        {answer.text}
      </QuizComponents.AnswerItem>
    );
  });


  return (
    <div>
      <QuizComponents.MainQuestion>
        {question}
      </QuizComponents.MainQuestion>
      <QuizComponents.AnswersParent>
        {answersElements}
      </QuizComponents.AnswersParent>
    </div>
  );
};

export default QuizElement;

