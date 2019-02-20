import classnames from 'classnames';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import {TopBar, Button} from '../components';

const ModalConsumer = (props) => {
  const {
    values: {
      theme,
      bgColor,
      bgUrl,
      modal,
      showExit,
      handleShowExit,
      handleCancelClose,
      handleClose,
      children,
    },
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
    {'modal__inner--exit': showExit},
  );

  if (showExit) {
    return (
      <div
        className={modalClasses}
        style={modalStyle}
      >
        <div className={modalInnerClasses}>
          <div className="modal__exit-outer">
            <div className="modal__exit-title">
              {__('Leaving already', 'quizess')}
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
          values={{
            theme,
            showExit,
            bgColor,
            bgUrl,
            modal,
            handleShowExit,
            handleCancelClose,
            handleClose,
            children,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Modal;
