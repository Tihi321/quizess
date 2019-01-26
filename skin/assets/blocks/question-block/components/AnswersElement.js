import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import {BlockConsumer} from '../containers/BlockContext';

function AnswersElementConsumer(props) {
  const {
    values: {
      rows,
      handleAnswerOnChange,
      handleRemoveAnswer,
      handleAddAnswer,
      handleCorrectAnswer,
      clientId,
      answers,
    },
  } = props;

  const rowsValue = (rows) ? JSON.parse(rows).value : 'row';


  return (
    <Fragment>
      <div className="answers-element">
        <div className="answers-label">
          <h4 className="answers-label--title">{__('Answers', 'quizess')}</h4>
          <p className="answers-label--description">{__('Add a possible answer', 'quizess')}</p>
        </div>
        <ul className={`answers-items-list ${rowsValue}`}>
          {answers.map((answer, id) => {
            return (
              <li key={id} className="answers-item">
                <div className="answers-item--wrap">
                  <div className="answers-item--number">{id + 1}</div>
                  <input
                    className="answers-item--text"
                    type="text"
                    placeholder={`Answer number #${id + 1}`}
                    value={answer.text}
                    onChange={handleAnswerOnChange(id)}
                  />
                  <div className="radio-wrap">
                    <label htmlFor={`radio-${clientId}-${id}`}>{__('Correct', 'quizess')}</label>
                    <input className="radio-input" onChange={handleCorrectAnswer} type="radio" name="answer" id={`radio-${clientId}-${id}`} value={id} checked={answer.correct}></input>
                  </div>
                </div>
                <button type="button" onClick={handleRemoveAnswer(id)} className="remove-button button button-secondary">-</button>
              </li>
            );
          })}
        </ul>
        <div className="add-buttopn-wrap">
          <button type="button" onClick={handleAddAnswer} className="add-button button button-primary">{__('Add answer', 'quizess')}</button>
        </div>
      </div>
    </Fragment>
  );
}

const AnswersElement = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            rows,
          },
          clientId,
          answers,
        },
        attributesStore: {
          handleAnswerOnChange,
          handleRemoveAnswer,
          handleAddAnswer,
          handleCorrectAnswer,
        },
      } = value;
      return (
        <AnswersElementConsumer
          values={{
            rows,
            clientId,
            answers,
            handleAnswerOnChange,
            handleRemoveAnswer,
            handleAddAnswer,
            handleCorrectAnswer,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default AnswersElement;
