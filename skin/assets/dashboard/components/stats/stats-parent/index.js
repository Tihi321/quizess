import {__} from '@wordpress/i18n';
import {chunk} from 'lodash';
import Pagination from '../../pagination';

const StatsParent = (props) => {
  const {
    pagination = false,
    items,
    page,
    onPageChange,
    children,
  } = props;

  const singleCheck = ((!children || !pagination) || children.length < 5) || false;

  const elements = (singleCheck) ? children : chunk(children, items);

  const statsListElement = (
    <ul
      className="scores-list__parent"
    >
      <li
        className="scores-list__item scores-list__item--title">
        <div className="scores-list__inner scores-list__title">
          <div>{__('Question success rate', 'quizess')}</div>
          <div>{__('Number of successful attempts', 'quizess')}</div>
        </div>
      </li>
      <li
        className="scores-list__item scores-list__item--title">
        <div className="scores-list__inner scores-list__title">
          {__('Number', 'quizess')}
        </div>
        <div className="scores-list__inner scores-list__title">
          {__('Correct', 'quizess')}
        </div>
      </li>
      {(singleCheck) ? elements : elements[page]}
    </ul>
  );

  if (singleCheck) {
    return statsListElement;
  }

  return (
    <div
      className="stats__pagination"
    >
      {statsListElement}
      <Pagination
        items={3}
        page={page}
        onPageChange={onPageChange}
        elementItems={children}
      />
    </div>
  );
};

export default StatsParent;
