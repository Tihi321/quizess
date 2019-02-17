import {Fragment} from '@wordpress/element';
import {BlockConsumer} from '../containers/BlockContext';
import {
  QuestionHeader,
  MainQuestion,
  AnswersParent,
  Answer,
  ExplanationText,
  ExplanationPreview,
} from '../components';

const QuizElementConsumer = (props) => {
  const {
    values: {
      theme,
      rows,
      question,
      answers,
      title,
      questionNumber,
      showExplanation,
      explanation,
      explanationType,
      explanationMedia,
      numberOfQuestions,
    },
  } = props;

  const themeValue = (theme) ? JSON.parse(theme).value : 'light';

  const answersElements = answers.map((answer, index) => {
    return (
      <Answer
        theme={themeValue}
        key={index}
        number={index + 1}
        state={(answer.correct) ? 2 : 0}
      >
        {answer.text}
      </Answer>
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
      <AnswersParent rows={rows}>{answersElements}</AnswersParent>
      {showExplanation && explanationElements}
    </div>
  );
};

const QuizElement = ({
  question,
  answers,
  title,
  questionNumber,
  showExplanation,
  explanation,
  explanationType,
  explanationMedia,
  numberOfQuestions,
}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            theme,
            rows,
          },
        },
      } = value;
      return (
        <QuizElementConsumer
          values={{
            theme,
            rows,
            question,
            answers,
            title,
            questionNumber,
            showExplanation,
            explanation,
            explanationType,
            explanationMedia,
            numberOfQuestions,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default QuizElement;

