import classnames from 'classnames';

const AnswersParent = (props) => {
  const {
    rows,
    templateBlock = false,
    children,
  } = props;

  const rowsValue = (rows && !templateBlock) ? rows : 'row';

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
