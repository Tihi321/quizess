const InputRow = (props) => {
  const {
    className = '',
    children,
  } = props;

  return (
    <div
      className={`qzui__input-row ${className}`}
    >
      {children}
    </div>
  );
};

export default InputRow;
