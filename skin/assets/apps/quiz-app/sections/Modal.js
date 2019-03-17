import classnames from 'classnames';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import {TopBar, Button} from '../../../components';

const ModalConsumer = (props) => {
  const {
    theme,
    bgColor,
    bgUrl,
    modal,
    userPlayer,
    userSubmit,
    scoresSubmited,
    showExit,
    handleShowExit,
    handleCancelClose,
    handleClose,
    children,
  } = props;

  const modalStyle = {
    backgroundColor: bgColor || false,
    backgroundImage: (bgUrl) ? `url(${bgUrl})` : false,
  };

  const modalClasses = classnames(
    'modal',
    (modal) ? 'is-active' : 'is-inactive',
  );
  const modalInnerClasses = classnames(
    'modal__inner',
    `modal__inner--${theme}`,
    (showExit) ? 'modal__inner--wide' : 'modal__inner--narrow',
  );

  if (showExit) {
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

    const rnd = Math.floor(Math.random() * Math.floor(10));
    const message = messages[rnd];

    const submitNotification = (userPlayer && userSubmit && !scoresSubmited) ? __('If you cancel your scores will be submitted.', 'quizess') : '';

    return (
      <div
        className={modalClasses}
        style={modalStyle}
      >
        <div className={modalInnerClasses}>
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
        </div>
      </div>
    );
  }

  return (
    <div
      className={modalClasses}
      style={modalStyle}
    >
      <div className={modalInnerClasses}>
        <TopBar
          theme={theme}
          closeCallback={handleShowExit}
        />
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

const Modal = ({children}) => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          showExit,
          modal,
          userPlayer,
          userSubmit,
          scoresSubmited,
          data: {
            options: {
              theme,
            },
            bgOptions: {
              bgColor,
              bgUrl,
            },
          },
        },
        dataStore: {
          handleShowExit,
          handleCancelClose,
          handleClose,
        },
      } = value;
      return (
        <ModalConsumer
          theme={theme}
          showExit={showExit}
          bgColor={bgColor}
          bgUrl={bgUrl}
          modal={modal}
          userSubmit={userSubmit}
          userPlayer={userPlayer}
          scoresSubmited={scoresSubmited}
          handleShowExit={handleShowExit}
          handleCancelClose={handleCancelClose}
          handleClose={handleClose}
          children={children}
        />
      );
    }}
  </AppConsumer>
);

export default Modal;
