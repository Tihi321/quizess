import {Fragment} from '@wordpress/element';
import {
  QuestionHeader,
  MainQuestion,
  AnswersParent,
  AnswerItem,
  ExplanationText,
  ExplanationPreview,
} from './QuizComponents';

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
      <AnswerItem key={index} number={index + 1} correct={answer.correct}>
        {answer.text}
      </AnswerItem>
    );
  });

  const explanationElements = (
    <Fragment>
      <ExplanationText>{explanation}</ExplanationText>
      <ExplanationPreview explanationType={explanationType}>
        {explanationMedia}
      </ExplanationPreview>
    </Fragment>
  );

  return (
    <div className="quiz-elements__item">
      <QuestionHeader
        title={title}
        questionNumber={questionNumber}
        numberOfQuestions={numberOfQuestions}
      />
      <MainQuestion>{question}</MainQuestion>
      <AnswersParent>{answersElements}</AnswersParent>
      {showExplanation && explanationElements}
    </div>
  );
};

export default QuizElement;
