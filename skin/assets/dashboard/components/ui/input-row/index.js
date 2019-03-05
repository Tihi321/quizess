const InputRow = (props) => {
  const {
    className = 'custom-class',
    children,
  } = props;


  const toggleElement = (
    <div
      className={`qzui__input-row ${className}`}
    >
      {children}
    </div>
  );



  return toggleElement;
};

export default InputRow;
