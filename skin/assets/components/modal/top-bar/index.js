import classnames from 'classnames';
import {__} from '@wordpress/i18n';

const TopBar = (props) => {
  const {
    title = __('Quizess', 'quizess'),
    theme,
    closeCallback,
  } = props;

  const closeOuterClasses = classnames(
    'modal__top-bar',
    `modal__top-bar--${theme}`,
  );

  return (
    <div className={closeOuterClasses}>
      <h1 className="modal__title">
        {title}
      </h1>
      <button
        className="btn-close"
        onClick={closeCallback}
      >
      </button>
    </div>
  );

};

export default TopBar;
