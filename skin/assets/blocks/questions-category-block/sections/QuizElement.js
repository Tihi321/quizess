import {Fragment} from '@wordpress/element';
import {BlockConsumer} from '../containers/BlockContext';
import ExplanationHeader from './ExplanationHeader';
import {
  QuestionHeader,
  MainQuestion,
  AnswersParent,
  Answer,
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
      category,
    },
  } = props;

  const categoryValue = JSON.parse(category).label;
  const themeValue = (theme) ? JSON.parse(theme).value : 'light';
  const rowsValue = (rows) ? JSON.parse(rows).value : 'row';

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

  const {value} = explanationType;

  const explanationElements = (
    <Fragment>
      <ExplanationHeader>{explanation}</ExplanationHeader>
      <ExplanationPreview type={value} media={explanationMedia} />
    </Fragment>
  );

  return (
    <div className="quiz-elements__item">
      <QuestionHeader
        title={title}
        category={categoryValue}
        questionNumber={questionNumber}
        numberOfQuestions={numberOfQuestions}
      />
      <MainQuestion>{question}</MainQuestion>
      <AnswersParent rows={rowsValue}>{answersElements}</AnswersParent>
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
            category,
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
            category,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default QuizElement;

