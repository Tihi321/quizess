import classnames from 'classnames';

const AnswerItem = (props) => {
  const {
    correct,
    number,
    children,
  } = props;

  return (
    <div className={classnames('answers-item', (correct) ? 'answers-item--correct' : false)}>
      <div className="answers-item__outer">
        <div className="answers-item__number">{number}</div>
        <div className="answers-item__text">{children}</div>
      </div>
    </div>
  );
};

export default AnswerItem;
