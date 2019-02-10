import classnames from 'classnames';
import {BlockConsumer} from '../../containers/BlockContext';

const AnswersParentConsumer = (props) => {
  const {
    values: {
      theme,
      rows,
      children,
      templateBlock,
    },
  } = props;

  const rowsValue = (rows && !templateBlock) ? JSON.parse(rows).value : 'row';
  const themeClass = (theme && !templateBlock) ? JSON.parse(theme).value : 'light';

  return (
    <ul
      className={
        classnames('answers-list', `answers-list--${rowsValue}`, `answers-list--${themeClass}`)}
    >
      {children}
    </ul>
  );
};

const AnswersParent = ({children}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            theme,
            rows,
            templateBlock,
          },
        },
      } = value;
      return (
        <AnswersParentConsumer
          values={{
            templateBlock,
            theme,
            rows,
            children,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default AnswersParent;
