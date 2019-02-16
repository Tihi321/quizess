import classnames from 'classnames';
import {BlockConsumer} from '../containers/BlockContext';
import TopBar from './modal/TopBar';

const ModalConsumer = (props) => {
  const {
    values: {
      theme,
      bgColor,
      bgUrl,
      modal,
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
        <TopBar />
        <div className="modal__content">

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
      } = value;
      return (
        <ModalConsumer
          values={{
            theme,
            bgColor,
            bgUrl,
            modal,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default Modal;
