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
    scorePage,
    handleOnStatsPageChange,
    handleOnScorePageChange,
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
        className="dashboard__table"
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
        className="dashboard__table"
        key={index}
        number={index}
        correct={value}
      >
      </StatsItem>
    );
  });


  return (
    <div
      className="dashboard__tables"
    >
      <div
        className="dashboard__scores"
      >
        <ScoresParent
          className="dashboard__table"
          pagination={true}
          items={10}
          page={scorePage}
          onPageChange={handleOnScorePageChange}
        >
          {scoresElement}
        </ScoresParent>
      </div>
      <div
        className="dashboard__stats"
      >
        <StatsParent
          className="dashboard__table"
          pagination={true}
          items={10}
          page={statsPage}
          onPageChange={handleOnStatsPageChange}
        >
          {statsElement}
        </StatsParent>
      </div>
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
          scorePage,
          statsPage,
        },
        dataStore: {
          handleOnRemove,
          handleOnStatsPageChange,
          handleOnScorePageChange,
        },
      } = value;

      // question stats
      const stats = (selectedQuiz.index > -1) ? scoresData[selectedQuiz.index].questionStats : [];

      return (
        <ScoresConsumer
          scorePage={scorePage}
          statsPage={statsPage}
          selectedQuiz={selectedQuiz}
          stats={stats}
          handleOnRemove={handleOnRemove}
          handleOnScorePageChange={handleOnScorePageChange}
          handleOnStatsPageChange={handleOnStatsPageChange}
        />
      );
    }}
  </DashboardConsumer>
);

export default Scores;
