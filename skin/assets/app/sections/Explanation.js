import classnames from 'classnames';
import {AppConsumer} from '../containers/AppContext';
import QuestionHeader from '../parts/QuestionHeader';

const ExplanationConsumer = (props) => {
  const {
    values: {
      theme,
      selectedAnswer,
      explanationMedia,
      explanationText,
      explanationType,
    },
  } = props;


  const questionClasses = classnames(
    'explanation',
    `explanation--${theme}`,
  );

  return (
    <div
      className={questionClasses}
    >
    </div>
  );
};

const Explanation = ({
  explanationMedia,
  explanationText,
  explanationType,
}) => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          selectedAnswer,
          data: {
            options: {
              theme,
              failureMessage,
              successMessage,
            },
          },
        },
      } = value;
      return (
        <ExplanationConsumer
          values={{
            selectedAnswer,
            theme,
            failureMessage,
            successMessage,
            explanationMedia,
            explanationText,
            explanationType,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Explanation;
