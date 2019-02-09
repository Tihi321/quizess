import classnames from 'classnames';
import {BlockConsumer} from '../containers/BlockContext';

const ModalConsumer = (props) => {
  const {
    values: {
      modal,
      data: {
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
    (modal) ? 'is-active' : 'is-inactive ',
  );

  return (
    <div
      className={modalClasses}
      style={modalStyle}
    >
      <div className="modal__inner">
        <div className="modal__close-btn-wrap">
          <button
            className="modal__close-btn"
            onClick={handleClose}
          >
          </button>
        </div>
        <div className="modal__content">
          <h1>
            koma
          </h1>
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
