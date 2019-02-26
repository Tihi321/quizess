import {DashboardConsumer} from '../containers/DashboardContext';
import {
  ScoresParent,
  ScoresItem,
} from '../components';

const ScoresConsumer = (props) => {
  const {
    selectedQuiz,
    handleOnRemove,
  } = props;

  const scoresElement = selectedQuiz.data.map((value, index) => {
    const {
      name,
      attempts,
      correct,
      total,
    } = value;
    return (
      <ScoresItem
        key={index}
        quizId={selectedQuiz.id}
        playerId={value.id}
        name={name}
        correct={correct}
        total={total}
        attempts={attempts}
        onClick={handleOnRemove}
      >
      </ScoresItem>
    );
  });



  return (
    <ScoresParent>
      {scoresElement}
    </ScoresParent>
  );
};

const Scores = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          selectedQuiz,
        },
        dataStore: {
          handleOnRemove,
        },
      } = value;
      return (
        <ScoresConsumer
          selectedQuiz={selectedQuiz}
          handleOnRemove={handleOnRemove}
        />
      );
    }}
  </DashboardConsumer>
);

export default Scores;
