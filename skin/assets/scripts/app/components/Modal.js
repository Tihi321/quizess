import classnames from 'classnames';
import {BlockConsumer} from '../containers/BlockContext';

const ModalConsumer = (props) => {
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
      dataStore: {
        handleClose,
      },
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
  const closeBtnClasses = classnames(
    'btn-close',
    `btn-close--${theme}`,
  );

  return (
    <div
      className={modalClasses}
      style={modalStyle}
    >
      <div className={modalInnerClasses}>
        <div className="modal__close-outer">
          <button
            className={closeBtnClasses}
            onClick={handleClose}
          >
          </button>
        </div>
        <div className="modal__content">
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          modal,
          data,
        },
        dataStore,
      } = value;
      return (
        <ModalConsumer
          values={{
            data,
            modal,
            dataStore,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default Modal;
