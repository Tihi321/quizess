import {__} from '@wordpress/i18n';

const AnswerItem = (props) => {
  const {
    clientId,
    id,
    text,
    correct,
    handleAnswerOnChange,
    handleCorrectAnswer,
    handleRemoveAnswer,
  } = props;

  return (
    <li key={id} className="answers-item">
      <div className="answers-item__outer">
        <div className="answers-item__number">{id + 1}</div>
        <input
          className="answers-item__text"
          type="text"
          placeholder={`Answer number #${id + 1}`}
          value={text}
          onChange={handleAnswerOnChange(id)}
        />
        <div className="answers-correct">
          <label htmlFor={`correct-${clientId}-${id}`}>{__('Correct', 'quizess')}</label>
          <input className="answers-correct__input" onChange={handleCorrectAnswer} type="radio" name="answer" id={`correct-${clientId}-${id}`} value={id} checked={correct}></input>
        </div>
      </div>
      <button type="button" onClick={handleRemoveAnswer(id)} className="btn-remove button button-secondary">-</button>
    </li>
  );
};

export default AnswerItem;
