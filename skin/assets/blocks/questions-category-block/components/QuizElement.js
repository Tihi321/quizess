import {Fragment} from '@wordpress/element';
import QuizComponents from './QuizComponents';

const QuizElement = (props) => {
  const {
    question,
    answers,
    title,
    questionNumber,
    showExplanation,
    explanation,
    explanationType,
    explanationMedia,
    numberOfQuestions,
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

  const explanationElements = (
    <Fragment>
      <QuizComponents.ExplanationText>
        {explanation}
      </QuizComponents.ExplanationText>
      <QuizComponents.ExplanationPreview
        explanationType={explanationType}
      >
        {explanationMedia}
      </QuizComponents.ExplanationPreview>
    </Fragment>
  );


  return (
    <div className="quiz-element-item">
      <QuizComponents.QuestionHeader
        title={title}
        questionNumber={questionNumber}
        numberOfQuestions={numberOfQuestions}
      />
      <QuizComponents.MainQuestion>
        {question}
      </QuizComponents.MainQuestion>
      <QuizComponents.AnswersParent>
        {answersElements}
      </QuizComponents.AnswersParent>
      {(showExplanation) && explanationElements}
    </div>
  );
};

export default QuizElement;

