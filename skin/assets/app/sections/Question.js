import classnames from 'classnames';
import {AppConsumer} from '../containers/AppContext';
import QuestionHeader from '../parts/QuestionHeader';

const QuestionConsumer = (props) => {
  const {
    values: {
      theme,
      questionValues: {
        answers,
        direction,
        question,
        theme: questionTheme,
        title,
        explanationMedia,
        explanationText,
        explanationType,
      },
    },
  } = props;


  const questionClasses = classnames(
    'question',
    `question--${theme}`,
  );

  return (
    <div
      className={questionClasses}
    >
      <QuestionHeader
        title={title}
      />
    </div>
  );
};

const Question = (questionData) => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          data: {
            options: {
              theme,
            },
          },
        },
      } = value;
      const questionValues = questionData.questionData;
      return (
        <QuestionConsumer
          values={{
            theme,
            questionValues,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Question;
