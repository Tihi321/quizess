const TableButton = (props) => {
  const {
    className = '',
    warning = false,
    onClick,
    children,
  } = props;

  const buttonClasses = (warning) ? `table__button table__button--warning ${className}` : `table__button table__button--primary ${className}`;


  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TableButton;
