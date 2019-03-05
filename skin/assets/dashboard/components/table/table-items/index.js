import {Children} from 'react';

const TableItems = (props) => {
  const {
    className = 'table',
    items = [],
    children,
  } = props;

  const childrenElements = (children) ? Children.map(children, (child) => {
    return (
      <div
        className={`${className}__inner`}
      >
        {child}
      </div>
    );
  }) : '';

  const itemElements = items.map((item, index) => {
    return (
      <div
        key={index}
        className={`${className}__inner`}
      >
        {item}
      </div>
    );
  });

  return (
    <li
      className={`${className}__item`}>
      {itemElements}
      {childrenElements}
    </li>
  );
};

export default TableItems;
