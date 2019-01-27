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
      <div className="answers-item--wrap">
        <div className="answers-item--number">{id + 1}</div>
        <input
          className="answers-item--text"
          type="text"
          placeholder={`Answer number #${id + 1}`}
          value={text}
          onChange={handleAnswerOnChange(id)}
        />
        <div className="radio-wrap">
          <label htmlFor={`radio-${clientId}-${id}`}>{__('Correct', 'quizess')}</label>
          <input className="radio-input" onChange={handleCorrectAnswer} type="radio" name="answer" id={`radio-${clientId}-${id}`} value={id} checked={correct}></input>
        </div>
      </div>
      <button type="button" onClick={handleRemoveAnswer(id)} className="remove-button button button-secondary">-</button>
    </li>
  );
};

export default AnswerItem;
