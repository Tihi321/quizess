import classnames from 'classnames';
import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import TextElement from '../../../../elements/TextElement';

const AnswerInput = (props) => {
  const {
    clientId,
    id,
    text,
    correct,
    handleAnswerOnChange,
    handleCorrectAnswer,
    handleRemoveAnswer,
    theme,
  } = props;

  const answerClasses = classnames(
    'answers-item',
    'answers-input',
  );
  const answerOuterClasses = classnames(
    'answers-input__outer',
    `answers-input__outer--${theme}`,
  );

  /* eslint-disable */
  const answerInputElement = (
    <Fragment>
      <TextElement
          styleReset={true}
          outputType='text'
          className="qz-input-mce-class"
          value={text}
          onChange={(newTtext) => handleAnswerOnChange(id, newTtext)}
          maxChars={50}
          maxRows={2}
          warning={true}
          single={true}
          init={{
            selection_toolbar:false,
            insert_toolbar: false,
          }}
        />
    </Fragment>
  );
  /* eslint-enable */

  return (
    <li key={id} className={answerClasses}>
      <div className={answerOuterClasses}>
        <div className="answers-input__number">{id + 1}</div>
        <div className="answers-input__text">
          {answerInputElement}
        </div>
        <div className="answers-correct">
          <label htmlFor={`correct-${clientId}-${id}`}>{__('Correct', 'quizess')}</label>
          <input className="answers-correct__input" onChange={handleCorrectAnswer} type="radio" name="answer" id={`correct-${clientId}-${id}`} defaultValue={id} checked={correct}></input>
        </div>
      </div>
      <button type="button" onClick={handleRemoveAnswer(id)} className="btn-remove button button-secondary">-</button>
    </li>
  );
};

export default AnswerInput;
