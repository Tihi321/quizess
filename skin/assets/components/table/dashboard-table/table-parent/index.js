import {chunk} from 'lodash';
import {Pagination} from '../../../index';

const TableParent = (props) => {
  const {
    className = 'table',
    pagination = false,
    titles = [],
    description = null,
    items,
    page,
    onPageChange,
    children,
  } = props;

  const singleCheck = ((!children || !pagination) || children.length < items) || false;
  const elements = (singleCheck) ? children : chunk(children, items);

  const titlesElements = titles.map((title, index) => {
    return (
      <div
        className={`${className}__inner ${className}__title`}
        key={index}
      >
        {title}
      </div>
    );
  });
  const titlesElement = (
    <li
      className={`${className}__item ${className}__item--title`}
    >
      {titlesElements}
    </li>
  );

  const descriptionElements = (description) ? description.map((descript, index) => {
    return (
      <div
        key={index}
        className={`${className}__inner--explanation`}
      >
        {descript}
      </div>
    );
  }) : null;

  const descriptionParentElement = (
    <li
      className={`${className}__item`}>
      <div className={`${className}__inner ${className}__explanation`}>
        {descriptionElements}
      </div>
    </li>
  );

  const statsListElement = (
    <ul
      className={`${className}__parent`}
    >
      {titlesElement}
      {(singleCheck) ? elements : elements[page]}
      {(description) && descriptionParentElement}
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

export default TableParent;
