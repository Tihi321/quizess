import classnames from 'classnames';

const AnswerItem = (props) => {
  const {
    correct,
    children,
  } = props;

  return (
    <div className={classnames('answers-item', (correct) ? 'correct-answer' : false)}>
      {children}
    </div>
  );
};

export default AnswerItem;
