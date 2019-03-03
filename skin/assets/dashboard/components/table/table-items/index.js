const TableItems = (props) => {
  const {
    className = 'stats',
    items = [],
    children,
  } = props;

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
      {children}
    </li>
  );
};

export default TableItems;
