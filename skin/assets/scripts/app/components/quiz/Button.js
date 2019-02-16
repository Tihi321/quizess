import classnames from 'classnames';
import {BlockConsumer} from '../../containers/BlockContext';

const ButtonConsumer = (props) => {
  const {
    values: {
      children,
      theme,
      onClick,
    },
  } = props;


  const buttonClasses = classnames(
    'btn',
    `btn--${theme}`,
  );

  return (
    <button
      onClick={onClick}
      className={buttonClasses}>
      {children}
    </button>
  );

};

const Button = ({children, onClick}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          theme,
        },
      } = value;
      return (
        <ButtonConsumer
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

export default Button;
