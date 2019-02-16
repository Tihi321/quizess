import classnames from 'classnames';
import {BlockConsumer} from '../../containers/BlockContext';

const TopBarConsumer = (props) => {
  const {
    values: {
      theme,
      handleClose,
    },
  } = props;

  const closeOuterClasses = classnames(
    'modal__close-outer',
    `modal__close-outer--${theme}`,
  );

  return (
    <div className={closeOuterClasses}>
      <button
        className="btn-close"
        onClick={handleClose}
      >
      </button>
    </div>
  );

};

const TopBar = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          data: {
            options: {
              theme,
            },
          },
        },
        dataStore: {
          handleClose,
        },
      } = value;
      return (
        <TopBarConsumer
          values={{
            theme,
            handleClose,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default TopBar;
