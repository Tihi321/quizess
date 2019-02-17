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
            children,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default Modal;
