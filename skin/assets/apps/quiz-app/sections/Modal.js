import classnames from 'classnames';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import {
  TopBar,
  PopUpElememnt,
  Placeholder,
} from '../../../components';

const ModalConsumer = (props) => {
  const {
    theme,
    bgColor,
    bgUrl,
    modal,
    shouldSubmit,
    shoudNotPlay,
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

  if (shoudNotPlay) {
    return (
      <div
        className={modalClasses}
        style={modalStyle}
      >
        <div className={modalInnerClasses}>
          <Placeholder type="info">
            {__('Your scores have been submitted, thank you for playing.', 'quizess')}
          </Placeholder>
        </div>
      </div>
    );
  }

  if (showExit) {
    return (
      <div
        className={modalClasses}
        style={modalStyle}
      >
        <div className={modalInnerClasses}>
          <PopUpElememnt
            theme={theme}
            shouldSubmit={shouldSubmit}
            scoresSubmited={scoresSubmited}
            handleCancelClose={handleCancelClose}
            handleClose={handleClose}
          />
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
          shouldSubmit,
          shoudNotPlay,
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
          shouldSubmit={shouldSubmit}
          shoudNotPlay={shoudNotPlay}
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
