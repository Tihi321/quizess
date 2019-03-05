import {__} from '@wordpress/i18n';
import {DashboardButton} from '../index';

const Dialog = (props) => {
  const {
    className = 'dialog',
    message = __('Are you sure', 'quizess'),
    onConfirm,
    onCancel,
  } = props;


  const confirmButton = (
    <DashboardButton
      className={`${className}__button ${className}__confirm`}
      warning={true}
      onClick={onConfirm}
      size="big"
    >
      {__('Confirm', 'quizess')}
    </DashboardButton>
  );

  const cancelButton = (
    <DashboardButton
      className={`${className}__button ${className}__cancel`}
      onClick={onCancel}
      size="big"
    >
      {__('Cancel', 'quizess')}
    </DashboardButton>
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
