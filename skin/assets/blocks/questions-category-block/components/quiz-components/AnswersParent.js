import classnames from 'classnames';
import {BlockConsumer} from '../../containers/BlockContext';

const AnswerParentConsumer = (props) => {
  const {
    values: {
      theme,
      rows,
      children,
    },
  } = props;

  const rowsValue = (rows) ? JSON.parse(rows).value : 'row';

  return (
    <ul className={classnames(`answers-items-list ${rowsValue}`, (theme) ? `theme-${theme}` : 'theme-light')}>
      {children}
    </ul>
  );
};

const AnswersParent = ({
  children,
}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            theme,
            rows,
          },
        },
      } = value;
      return (
        <AnswerParentConsumer
          values={{
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
