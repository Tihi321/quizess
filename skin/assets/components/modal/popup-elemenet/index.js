import {__} from '@wordpress/i18n';
import {Button} from '../../index';

const PopUpElement = (props) => {
  const {
    theme,
    shouldSubmit,
    scoresSubmited,
    handleCancelClose,
    handleClose,
  } = props;

  const messages = [
    __('Get outta here and go back to your boring programs.', 'quizess'),
    __('Just leave. When you come back, I\'ll be waiting with a bat.', 'quizess'),
    __('Are you sure you want to quit this great quiz ?', 'quizess'),
    __('I wouldn\'t leave if I were you. Internet is much worse.', 'quizess'),
    __('Go ahead and leave. See if I care.', 'quizess'),
    __('Choose Cancel if you are brave, choose Exit to cover in shame. ', 'quizess'),
    __('Chickening out... already ?', 'quizess'),
    __('Heroes choose Cancel, Wimps choose Exit.', 'quizess'),
    __('So you think you can quit this easily, huh ?', 'quizess'),
    __('Dost thou wish to leave with such hasty abandon ?', 'quizess'),
  ];

  // export random message on each try.
  const rnd = Math.floor(Math.random() * Math.floor(10));
  const message = messages[rnd];

  const submitNotification = (shouldSubmit && !scoresSubmited) ? __('If you cancel your scores will be submitted.', 'quizess') : '';

  return (
    <div className="modal__exit-outer">
      <div className="modal__exit-title">
        {message}
        {(submitNotification) && <span className="modal__title-helper">
          {submitNotification}
        </span>}
      </div>
      <div className="modal__exit-btns">
        <Button
          theme={theme}
          onClick={handleCancelClose}
        >
          {__('Cancel', 'quizess')}
        </Button>
        <Button
          theme={theme}
          onClick={handleClose}
        >
          {__('Exit', 'quizess')}
        </Button>
      </div>
    </div>
  );
};

export default PopUpElement;
