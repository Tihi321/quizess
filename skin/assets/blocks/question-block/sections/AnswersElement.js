import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import {BlockConsumer} from '../containers/BlockContext';
import {
  AnswersParent,
  AnswerInput,
  Button,
} from '../components';

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
      templateBlock,
      rows,
    },
  } = props;

  const themeClass = (theme) ? JSON.parse(theme).value : 'light';
  const rowsValue = (rows) ? JSON.parse(rows).value : 'row';

  const answerElements = answers.map((answer, id) => {
    return (
      <AnswerInput
        theme={themeClass}
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
        <p className="answers-label__description">
          {__('Add a possible answer', 'quizess')}
        </p>
      </div>
      <AnswersParent
        templateBlock={templateBlock}
        rows={rowsValue}
      >
        {answerElements}
      </AnswersParent>
      <div className="add-answer__outer">
        <Button
          theme={themeClass}
          onClick={handleAddAnswer}
        >
          {__('Add answer', 'quizess')}
        </Button>
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
            templateBlock,
            rows,
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
            templateBlock,
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
