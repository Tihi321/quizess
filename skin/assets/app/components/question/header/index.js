import {__} from '@wordpress/i18n';

const QuestionHeader = (props) => {
  const {
    title,
    questionNumber,
    category,
    numberOfQuestions,
  } = props;

  return (
    <div className="question__header">
      <div className="question__title">
        {__('Title', 'quizess')}: {title}
      </div>
      <div className="question__category">
        {__('Category', 'quizess')}: {category}
      </div>
      <div className="question__number">
        {questionNumber + 1} / {numberOfQuestions}
      </div>
    </div>
  );
};

export default QuestionHeader;
