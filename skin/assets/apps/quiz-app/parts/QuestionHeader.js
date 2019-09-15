import {useContext} from 'react';
import {__} from '@wordpress/i18n';
import {Timer} from '../../../components';
import {AppContext} from '../containers/AppContext';

const QuestionHeader = ({title}) => {
  const {
    values: {
      questionsTotal,
      currentQuestion,
      stopTimer,
      playTimer,
      theme,
      data: {
        options: {
          timer,
        },
      },
    },
    dataStore: {
      handleOnStop,
    },
  } = useContext(AppContext);

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
          theme={theme}
        />
      </div>
      {(title) && titleElement}
      <div className="question__number">
        {__('Question', 'quizess')}: {currentQuestion + 1} / {questionsTotal}
      </div>
    </div>
  );
};

export default QuestionHeader;
