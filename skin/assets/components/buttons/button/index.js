import classnames from 'classnames';

const Button = (props) => {
  const {
    children,
    theme,
    onClick,
  } = props;


  const buttonClasses = classnames(
    'btn',
    `btn--${theme}`,
  );

  return (
    <button
      onClick={onClick}
      className={buttonClasses}>
      {children}
    </button>
  );

};

export default Button;
