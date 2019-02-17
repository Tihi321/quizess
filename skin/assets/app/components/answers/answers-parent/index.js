import classnames from 'classnames';

const AnswersParent = (props) => {
  const {
    rows,
    templateBlock = false,
    children,
  } = props;

  const rowsValue = (rows && !templateBlock) ? JSON.parse(rows).value : 'row';

  return (
    <ul
      className={
        classnames('answers-list', `answers-list--${rowsValue}`)}
    >
      {children}
    </ul>
  );
};

export default AnswersParent;
