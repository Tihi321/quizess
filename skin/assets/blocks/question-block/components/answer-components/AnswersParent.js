import classnames from 'classnames';
import {BlockConsumer} from '../../containers/BlockContext';

const AnswersParentConsumer = (props) => {
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

const AnswersParent = ({children}) => (
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
        <AnswersParentConsumer
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
