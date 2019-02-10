import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import classnames from 'classnames';
import {BlockConsumer} from '../containers/BlockContext';
import AnswersComponents from './AnswersComponents';

function AnswersElementConsumer(props) {
  const {
    values: {
      handleAnswerOnChange,
      handleRemoveAnswer,
      handleAddAnswer,
      handleCorrectAnswer,
      clientId,
      answers,
      theme,
    },
  } = props;

  const themeClass = (theme) ? JSON.parse(theme).value : 'light';

  const answerElements = answers.map((answer, id) => {
    return (
      <AnswersComponents.AnswerItem
        key={id}
        clientId={clientId}
        id={id}
        text={answer.text}
        correct={answer.correct}
        handleAnswerOnChange={handleAnswerOnChange}
        handleCorrectAnswer={handleCorrectAnswer}
        handleRemoveAnswer={handleRemoveAnswer}
      />
    );
  });


  return (
    <Fragment>
      <div className="answers-label">
        <h4 className="answers-label__title">{__('Answers', 'quizess')}</h4>
        <p className="answers-label__description">{__('Add a possible answer', 'quizess')}</p>
      </div>
      <AnswersComponents.AnswersParent>
        {answerElements}
      </AnswersComponents.AnswersParent>
      <div className="add-answer__outer">
        <button type="button" onClick={handleAddAnswer} className={classnames('btn', `btn--${themeClass}`)}>{__('Add answer', 'quizess')}</button>
      </div>
    </Fragment>
  );
}

const AnswersElement = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          clientId,
          answers,
          attributes: {
            theme,
          },
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
            theme,
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
