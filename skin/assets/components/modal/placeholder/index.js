const Placeholder = (props) => {
  const {
    type = 'info',
    children,
  } = props;
  return (
    <h4 className={`quiz__placeholder quiz__placeholder--${type}`}>
      {children}
    </h4>
  );
};

export default Placeholder;
