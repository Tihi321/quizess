import {__} from '@wordpress/i18n';
import {chunk} from 'lodash';
import Pagination from '../../../../app/components/pagination';

const StatsParent = (props) => {
  const {
    className = 'stats',
    pagination = false,
    items,
    page,
    onPageChange,
    children,
  } = props;

  const singleCheck = ((!children || !pagination) || children.length < items) || false;
  const elements = (singleCheck) ? children : chunk(children, items);

  const statsListElement = (
    <ul
      className={`${className}__parent`}
    >
      <li
        className={`${className}__item ${className}__item--title`}>
        <div className={`${className}__inner ${className}__title`}>
          {__('Number', 'quizess')}
        </div>
        <div className={`${className}__inner ${className}__title`}>
          {__('Correct', 'quizess')}
        </div>
      </li>
      {(singleCheck) ? elements : elements[page]}
      <li
        className={`${className}__item ${className}__item--title`}>
        <div className={`${className}__inner ${className}__explanation`}>
          <div className={`${className}__inner--explanation`}>{__('Question success rate', 'quizess')}</div>
          <div className={`${className}__inner--explanation`}>{__('Number of successful attempts', 'quizess')}</div>
        </div>
      </li>
    </ul>
  );

  if (singleCheck) {
    return statsListElement;
  }

  return (
    <div
      className={`${className}__list`}
    >
      {statsListElement}
      <Pagination
        items={items}
        page={page}
        onPageChange={onPageChange}
        elementItems={children}
      />
    </div>
  );
};

export default StatsParent;
