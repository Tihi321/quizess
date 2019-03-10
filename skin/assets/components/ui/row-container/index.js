const RowContainer = (props) => {
  const {
    className = '',
    align = 'right',
    children,
  } = props;

  return (
    <div
      className={`qzui__row-container qzui__row-container--${align} ${className}`}
    >
      {children}
    </div>
  );
};

export default RowContainer;
