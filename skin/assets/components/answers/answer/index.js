import classnames from 'classnames';
import {Fragment} from 'react';

const Answer = (props) => {
  const {
    correct,
    number = 0,
    children,
    theme,
    onClick,
    state = 0,
  } = props;

  let stateClass;

  switch (state) {
    case 1:
      stateClass = 'active';
      break;
    case 2:
      stateClass = 'correct';
      break;
    case 3:
      stateClass = 'incorrect';
      break;

    default:
      stateClass = 'normal';
      break;
  }


  const answerClasses = classnames(
    'answers-item',
    'answer',
    `answer--${theme}--${stateClass}`,
  );

  const answerElements = (
    <Fragment>
      <div className="answer__number">{number}</div>
      <div className="answer__text">{children}</div>
    </Fragment>
  );

  if (!onClick) {
    return (
      <div className={answerClasses}>
        {answerElements}
      </div>
    );
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick(number, correct);
    }
  };

  return (
    <div
      className={answerClasses}
      onKeyPress={handleKeyPress}
      tabIndex={number}
      role="button"
      onClick={() => {
        onClick(number, correct);
      }}
    >
      {answerElements}
    </div>
  );
};

export default Answer;
