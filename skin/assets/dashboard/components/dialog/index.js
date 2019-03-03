import {__} from '@wordpress/i18n';

const Dialog = (props) => {
  const {
    className = 'dialog',
    message = __('Are you sure', 'quizess'),
    onConfirm,
    onCancel,
  } = props;


  const confirmButton = (
    <button
      className={`${className}__button ${className}__confirm`}
      onClick={onConfirm}
    >
      {__('Confirm', 'quizess')}
    </button>
  );

  const cancelButton = (
    <button
      className={`${className}__button ${className}__cancel`}
      onClick={onCancel}
    >
      {__('Cancel', 'quizess')}
    </button>
  );

  const titleElement = (
    <div className={`${className}__title`}>
      {message}
    </div>
  );



  return (
    <div className={className}>
      {titleElement}
      {cancelButton}
      {confirmButton}
    </div>
  );
};

export default Dialog;
