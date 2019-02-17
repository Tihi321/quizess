import classnames from 'classnames';

const TopBar = (props) => {
  const {
    theme,
    closeCallback,
  } = props;

  const closeOuterClasses = classnames(
    'modal__top-bar',
    `modal__top-bar--${theme}`,
  );

  return (
    <div className={closeOuterClasses}>
      <button
        className="btn-close"
        onClick={closeCallback}
      >
      </button>
    </div>
  );

};

export default TopBar;
