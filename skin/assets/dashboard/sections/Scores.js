import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  TableParent,
  TableItems,
  TableButton,
} from '../components';
import generalHelper from '../../helpers/general-helper';

const ScoresConsumer = (props) => {
  const {
    selectedQuiz,
    stats,
    statsPage,
    scorePage,
    handleOnStatsPageChange,
    handleOnScorePageChange,
    handleOnShowDetails,
  } = props;

  const scoreTitles = [
    __('Name', 'quizess'),
    __('Attempts', 'quizess'),
    __('Correct', 'quizess'),
    __('Total', 'quizess'),
    __('Success', 'quizess'),
    '',
  ];

  const statsTitles = [
    __('Question', 'quizess'),
    __('Correct', 'quizess'),
  ];

  const statsDescriptions = [
    __('Question success rate', 'quizess'),
    __('Number of successful attempts', 'quizess'),
  ];

  const scoresElement = selectedQuiz.data.map((values, index) => {
    const {
      name,
      attempts,
      correct,
      total,
      last,
      id,
    } = values;

    const success = generalHelper.getPercentage(correct, total);

    const items = [
      name,
      attempts,
      correct,
      total,
      `${success}%`,
    ];

    const detailsButton = (
      <TableButton
        onClick={() => {
          handleOnShowDetails(id, index, selectedQuiz.value, last);
        }}
      >
        {__('View Details', 'quizess')}
      </TableButton>
    );

    return (
      <TableItems
        key={index}
        items={items}
      >
        {detailsButton}
      </TableItems>
    );
  });

  const statsElement = stats.map((value, index) => {
    const items = [
      index + 1,
      value,
    ];
    return (
      <TableItems
        key={index}
        items={items}
      >
      </TableItems>
    );
  });


  return (
    <div
      className="dashboard__tables"
    >
      <div
        className="dashboard__scores"
      >
        <TableParent
          pagination={true}
          items={10}
          page={scorePage}
          onPageChange={handleOnScorePageChange}
          titles={scoreTitles}
        >
          {scoresElement}
        </TableParent>
      </div>
      <div
        className="dashboard__stats"
      >
        <TableParent
          pagination={true}
          titles={statsTitles}
          description={statsDescriptions}
          items={10}
          page={statsPage}
          onPageChange={handleOnStatsPageChange}
        >
          {statsElement}
        </TableParent>
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
          modal,
        },
        dataStore: {
          handleOnShowDetails,
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
          modal={modal}
          handleOnShowDetails={handleOnShowDetails}
          handleOnScorePageChange={handleOnScorePageChange}
          handleOnStatsPageChange={handleOnStatsPageChange}
        />
      );
    }}
  </DashboardConsumer>
);

export default Scores;
