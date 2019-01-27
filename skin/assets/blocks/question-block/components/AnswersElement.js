import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
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
    },
  } = props;

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
      <div className="answers-element">
        <div className="answers-label">
          <h4 className="answers-label--title">{__('Answers', 'quizess')}</h4>
          <p className="answers-label--description">{__('Add a possible answer', 'quizess')}</p>
        </div>
        <AnswersComponents.AnswersParent>
          {answerElements}
        </AnswersComponents.AnswersParent>
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
