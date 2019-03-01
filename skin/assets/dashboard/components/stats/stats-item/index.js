import {__} from '@wordpress/i18n';
import generalHelper from '../../../../helpers/general-helper';

const StatsItem = (props) => {
  const {
    number,
    correct,
  } = props;

  return (
    <li
      className="scores-list__item">
      <div className="scores-list__inner">
        {number + 1}.
      </div>
      <div className="scores-list__inner">
        {correct}
      </div>
    </li>
  );
};

export default StatsItem;
