const DashboardButton = (props) => {
  const {
    className = '',
    warning = false,
    size = 'small',
    onClick,
    children,
  } = props;

  const warningClass = (warning) ? 'warning' : 'primary';
  const sizeClass = (size === 'small') ? 'small' : 'big';

  const buttonClasses = `dashboard__button dashboard__button--${sizeClass} dashboard__button--${warningClass} ${className}`;


  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DashboardButton;
