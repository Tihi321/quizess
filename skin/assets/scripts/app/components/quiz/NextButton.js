import classnames from 'classnames';
import {BlockConsumer} from '../../containers/BlockContext';
import icons from '../../icons';

const NextButtonConsumer = (props) => {
  const {
    values: {
      children,
      theme,
      onClick,
    },
  } = props;

  const buttonClasses = classnames(
    'next-btn',
    `next-btn--${theme}`,
  );

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={buttonClasses}>
      <div className="next-btn__content">
        {children}
      </div>
      <div className="next-btn__graphic">
        {icons.arrow}
      </div>
    </div>
  );

};

const NextButton = ({children, onClick}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          theme,
        },
      } = value;
      return (
        <NextButtonConsumer
          values={{
            children,
            theme,
            onClick,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default NextButton;
