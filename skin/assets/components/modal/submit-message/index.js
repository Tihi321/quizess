const SubmitMessage = (props) => {
  const {
    showMessage,
    successMessage,
    message = '',
    handleResetMessage,
  } = props;

  let timer;

  if (showMessage) {
    timer = setInterval(handleResetMessage, 3000);
  }

  if (!showMessage) {
    clearInterval(timer);
  }

  const messageClasses = `submit__message${(showMessage) ? ' is-shown' : ''} ${(successMessage) ? 'is-success' : 'is-error'}`;

  return (
    <div className={messageClasses}>
      <div className="trait-text">
        {message}
      </div>
    </div>
  );
};

export default SubmitMessage;
