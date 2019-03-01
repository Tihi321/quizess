import {DashboardConsumer} from '../containers/DashboardContext';
import {
  ScoresParent,
  ScoresItem,
  StatsParent,
  StatsItem,
} from '../components';

const ScoresConsumer = (props) => {
  const {
    selectedQuiz,
    handleOnRemove,
    stats,
    statsPage,
    handleOnStatsPageChange,
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
        index={index}
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

  const statsElement = stats.map((value, index) => {
    return (
      <StatsItem
        key={index}
        number={index}
        correct={value}
      >
      </StatsItem>
    );
  });


  return (
    <div>
      <ScoresParent>
        {scoresElement}
      </ScoresParent>
      <StatsParent
        pagination={true}
        items={3}
        page={statsPage}
        onPageChange={handleOnStatsPageChange}
      >
        {statsElement}
      </StatsParent>
    </div>
  );
};

const Scores = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          selectedQuiz,
          scoresData,
          statsPage,
        },
        dataStore: {
          handleOnRemove,
          handleOnStatsPageChange,
        },
      } = value;

      // question stats
      const stats = (selectedQuiz.index > -1) ? scoresData[selectedQuiz.index].questionStats : [];

      return (
        <ScoresConsumer
          statsPage={statsPage}
          selectedQuiz={selectedQuiz}
          stats={stats}
          handleOnRemove={handleOnRemove}
          handleOnStatsPageChange={handleOnStatsPageChange}
        />
      );
    }}
  </DashboardConsumer>
);

export default Scores;
