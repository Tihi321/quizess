import {__} from '@wordpress/i18n';
import generalHelper from '../../../helpers/general-helper';

const ScoresItem = (props) => {
  const {
    quizId,
    index,
    playerId,
    name,
    attempts,
    correct,
    total,
    onClick,
  } = props;

  const success = generalHelper.percentage(correct, total);

  return (
    <li
      className="scores-list__item">
      <div className="scores-list__inner">
        {name}
      </div>
      <div className="scores-list__inner">
        {attempts}
      </div>
      <div className="scores-list__inner">
        {correct}
      </div>
      <div className="scores-list__inner">
        {total}
      </div>
      <div className="scores-list__inner">
        {success}%
      </div>
      <div className="scores-list__inner">
        <button
          className="scores-list__remove"
          onClick={() => {
            onClick(playerId, quizId, index);
          }}
        >
          {__('Remove', 'quizess')}
        </button>
      </div>
    </li>
  );
};

export default ScoresItem;
