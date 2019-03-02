import {__} from '@wordpress/i18n';
import generalHelper from '../../../../helpers/general-helper';

const ScoresItem = (props) => {
  const {
    className = 'scores',
    quizId,
    index,
    playerId,
    name,
    attempts,
    correct,
    total,
    onClick,
  } = props;

  const success = generalHelper.getPercentage(correct, total);

  const scores = [
    name,
    attempts,
    correct,
    total,
    `${success}%`,
  ];

  const scoresElements = scores.map((score, index) => {
    return (
      <div
        className={`${className}__inner`}
        key={index}
      >
        {score}
      </div>
    );
  });

  return (
    <li
      className={`${className}__item`}>
      {scoresElements}
      <div className={`${className}__inner`}>
        <button
          className={`${className}__remove`}
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
