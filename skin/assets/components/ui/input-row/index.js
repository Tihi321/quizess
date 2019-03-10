const InputRow = (props) => {
  const {
    className = '',
    children,
  } = props;

  return (
    <div
      className={`quiz__input-row ${className}`}
    >
      {children}
    </div>
  );
};

export default InputRow;
