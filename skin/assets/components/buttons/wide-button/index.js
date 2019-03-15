import {Fragment} from 'react';
import classnames from 'classnames';
import icons from './icons';

const WideButton = (props) => {
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
      <div className="wide-btn__content">
        {children}
      </div>
      <div className="wide-btn__graphic">
        {icon}
      </div>
    </Fragment>
  );

  if (disabled) {
    return (
      <div
        className={classnames(
          'wide-btn',
          'wide-btn--disabled',
          {'wide-btn--next': (!featured)},
        )}>
        {btnElements}
      </div>
    );
  }

  const buttonClasses = classnames(
    'wide-btn',
    `wide-btn--${theme}`,
    {'wide-btn--next': (!featured)},
    {'wide-btn--explanation': (featured)},
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

export default WideButton;
