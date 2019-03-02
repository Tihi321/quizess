import {__} from '@wordpress/i18n';
import {NextButton} from '../../index';
import generalHelper from '../../../../helpers/general-helper';

const HallOfFame = (props) => {
  const {
    theme,
    onClick,
    questionsTotal,
    correctAnswers,
    questionStats,
  } = props;

  const percentSuccess = generalHelper.getPercentage(correctAnswers, questionsTotal);

  const statsElements = questionStats.map((item, index) => {
    const {
      id,
      correct,
    } = item;
    return (
      <li key={index} className="hall-fame__table-item">
        <div className="hall-fame__question-number">
          {index + 1}
        </div>
        <div className="hall-fame__question-answer">
          {id}
        </div>
        <div className="hall-fame__question-type">
          {(correct) ? __('Correct', 'quizess') : __('Incorrect', 'quizess')}
        </div>
      </li>
    );
  });

  return (
    <div className="hall-fame">
      <div className="hall-fame__header">
        {__('Congratulation, you have successfuly completed quiz.', 'quizess')}
      </div>
      <NextButton
        theme={theme}
        onClick={onClick}
      >
        {__('Try again', 'quizess')}
      </NextButton>
      <div className="hall-fame__footer">
        <div className="hall-fame__score">
          {__('Score', 'quizess')} {`${correctAnswers}/${questionsTotal}`}
        </div>
        <div className="hall-fame__percent">
          {__('Percent', 'quizess')} {`${percentSuccess}%`}
        </div>
        <ul className="hall-fame__table">
          <li className="hall-fame__table-item">
            <div className="hall-fame__question-number">
              {__('Question', 'quizess')}
            </div>
            <div className="hall-fame__question-answer">
              {__('Answer', 'quizess')}
            </div>
            <div className="hall-fame__question-type">
              {__('Correct/Incorrect', 'quizess')}
            </div>
          </li>
          {statsElements}
        </ul>
      </div>
    </div>
  );

};

export default HallOfFame;
