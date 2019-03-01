import {__} from '@wordpress/i18n';
import {chunk} from 'lodash';
import Pagination from '../../../../app/components/pagination';

const ScoresParent = (props) => {
  const {
    className = 'scores',
    pagination = false,
    items,
    page,
    onPageChange,
    children,
  } = props;

  const singleCheck = ((!children || !pagination) || children.length < items) || false;
  const elements = (singleCheck) ? children : chunk(children, items);

  const titles = [
    __('Name', 'quizess'),
    __('Attempts', 'quizess'),
    __('Correct', 'quizess'),
    __('Total', 'quizess'),
    __('Success', 'quizess'),
    __('Remove', 'quizess'),
  ];

  const titleElements = titles.map((title, index) => {
    return (
      <div
        className={`${className}__inner ${className}__title`}
        key={index}
      >
        {title}
      </div>
    );
  });

  const scoresListElement = (
    <ul
      className={`${className}__parent`}
    >
      <li
        className={`${className}__item ${className}__item--title`}>
        {titleElements}
      </li>
      {(singleCheck) ? elements : elements[page]}
    </ul>
  );

  if (singleCheck) {
    return scoresListElement;
  }

  return (
    <div
      className={`${className}__list`}
    >
      {scoresListElement}
      <Pagination
        items={items}
        page={page}
        onPageChange={onPageChange}
        elementItems={children}
      />
    </div>
  );
};

export default ScoresParent;
