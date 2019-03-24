import {__} from '@wordpress/i18n';
import {WideButton} from '../../index';
import generalHelper from '../../../helpers/general-helper';

const Overview = (props) => {
  const {
    playOnce = false,
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
      <li key={index} className="stats__item">
        <div className="stats__inner--overview">
          {index + 1}.
        </div>
        <div className="stats__inner--overview">
          {id}.
        </div>
        <div className="stats__inner--overview">
          {(correct) ? __('Correct', 'quizess') : __('Incorrect', 'quizess')}
        </div>
      </li>
    );
  });

  const thankYouElement = (
    <div className="overview__thank-you">
      {__('Your scores have been submitted, thank you for playing.', 'quizess')}
    </div>
  );

  return (
    <div className="overview">
      <div className="overview__header">
        {__('Kudos !', 'quizess')}
      </div>
      {(playOnce) ? thankYouElement : <WideButton
        theme={theme}
        onClick={onClick}
      >
        {__('Try again', 'quizess')}
      </WideButton>}
      <div className="overview__footer">
        <div className="quiz-accomplishment">
          <div className="modal__table-title quiz-accomplishment__title">
            {__('Stats', 'quizess')}
          </div>
          <ul className="quiz-accomplishment__parent">
            <li className="quiz-accomplishment__item quiz-accomplishment__item-title">
              <div className="quiz-accomplishment__inner quiz-accomplishment__title">
                {__('Correct', 'quizess')}
              </div>
              <div className="quiz-accomplishment__inner quiz-accomplishment__title">
                {__('Total', 'quizess')}
              </div>
              <div className="quiz-accomplishment__inner quiz-accomplishment__title">
                {__('Success', 'quizess')}
              </div>
            </li>
            <li className="quiz-accomplishment__item">

              <div className="quiz-accomplishment__inner">
                {correctAnswers}
              </div>
              <div className="quiz-accomplishment__inner">
                {questionsTotal}
              </div>
              <div className="quiz-accomplishment__inner">
                {`${percentSuccess}%`}
              </div>
            </li>
          </ul>
        </div>
        <div className="modal__stats-overview">
          <div className="modal__table-title stats__table-title">
            {__('Overview', 'quizess')}
          </div>
          <ul className="stats__parent">
            <li className="stats__item stats__item-title">
              <div className="stats__inner--overview stats__title">
                {__('Question', 'quizess')}
              </div>
              <div className="stats__inner--overview stats__title">
                {__('Answer', 'quizess')}
              </div>
              <div className="stats__inner--overview stats__title">
                {__('Status', 'quizess')}
              </div>
            </li>
            {statsElements}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default Overview;
