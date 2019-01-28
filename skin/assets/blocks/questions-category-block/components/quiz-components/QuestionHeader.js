import {__} from '@wordpress/i18n';
import {BlockConsumer} from '../../containers/BlockContext';

const QuestionHeaderConsumer = (props) => {
  const {
    values: {
      title,
      questionNumber,
      categoryValue,
      numberOfQuestions,
    },
  } = props;

  return (
    <div className="question-header">
      <div className="question-title">
        {__('Title', 'quizess')}: {title}
      </div>
      <div className="question-category">
        {__('Category', 'quizess')}: {categoryValue}
      </div>
      <div className="question-number">
        {questionNumber + 1} / {numberOfQuestions}
      </div>
    </div>
  );
};

const QuestionHeader = ({
  title,
  questionNumber,
  numberOfQuestions,
}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            category,
          },
        },
      } = value;
      const categoryValue = JSON.parse(category).label;
      return (
        <QuestionHeaderConsumer
          values={{
            title,
            questionNumber,
            categoryValue,
            numberOfQuestions,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default QuestionHeader;
