import classnames from 'classnames';
import {AppConsumer} from '../containers/AppContext';
import {TopBar} from '../components';

const ModalConsumer = (props) => {
  const {
    values: {
      theme,
      bgColor,
      bgUrl,
      modal,
      handleClose,
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
  );

  return (
    <div
      className={modalClasses}
      style={modalStyle}
    >
      <div className={modalInnerClasses}>
        <TopBar
          theme={theme}
          closeCallback={handleClose}
        />
        <div className="modal__content">

        </div>
      </div>
    </div>
  );
};

const Modal = () => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
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
          handleClose,
        },
      } = value;
      return (
        <ModalConsumer
          values={{
            theme,
            bgColor,
            bgUrl,
            modal,
            handleClose,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Modal;
