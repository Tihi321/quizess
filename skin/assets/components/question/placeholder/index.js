const Placeholder = (props) => {
  const {children} = props;
  return (
    <div className="modal__placeholder">
      {children}
    </div>
  );
};

export default Placeholder;
