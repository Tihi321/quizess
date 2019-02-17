import {Fragment} from 'react';
import classnames from 'classnames';
import icons from './icons';

const NextButton = (props) => {
  const {
    children,
    theme,
    onClick,
    disabled = false,
    featured = false,
  } = props;

  const icon = (featured) ? icons.eye : icons.arrow;

  const btnElements = (
    <Fragment>
      <div className="next-btn__content">
        {children}
      </div>
      <div className="next-btn__graphic">
        {icon}
      </div>
    </Fragment>
  );

  if (disabled) {
    return (
      <div
        className={classnames(
          'next-btn',
          'next-btn--disabled',
        )}>
        {btnElements}
      </div>
    );
  }

  const buttonClasses = classnames(
    'next-btn',
    `next-btn--${theme}`,
  );

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={buttonClasses}>
      {btnElements}
    </div>
  );

};

export default NextButton;
