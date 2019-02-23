import {__} from '@wordpress/i18n';
import {Timer} from '../components';
import {AppConsumer} from '../containers/AppContext';

const QuestionHeaderConsumer = (props) => {
  const {
    title,
    currentQuestion,
    questionsTotal,
    timer,
    handleOnStop,
    stopTimer,
    playTimer,
  } = props;

  const titleElement = (
    <div className="question__title">
      {title}
    </div>
  );

  return (
    <div className="question__header">
      <div className="question__timer">
        <Timer
          disabled={(timer === null) || false}
          endTime={timer}
          onEnd={handleOnStop}
          stop={stopTimer}
          play={playTimer}
        />
      </div>
      {(title) && titleElement}
      <div className="question__number">
        {__('Question', 'quizess')}: {currentQuestion + 1} / {questionsTotal}
      </div>
    </div>
  );
};

const QuestionHeader = ({title}) => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          questionsTotal,
          currentQuestion,
          stopTimer,
          playTimer,
          data: {
            options: {
              timer,
            },
          },
        },
        dataStore: {
          handleOnStop,
        },
      } = value;
      return (
        <QuestionHeaderConsumer
          title={title}
          currentQuestion={currentQuestion}
          questionsTotal={questionsTotal}
          timer={timer}
          handleOnStop={handleOnStop}
          stopTimer={stopTimer}
          playTimer={playTimer}
        />
      );
    }}
  </AppConsumer>
);

export default QuestionHeader;
