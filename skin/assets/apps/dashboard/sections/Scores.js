import {useContext} from 'react';
import {__} from '@wordpress/i18n';
import {DashboardContext} from '../containers/DashboardContext';
import {
  TableParent,
  TableItems,
  DashboardButton,
} from '../components';
import {getPercentage} from '../../../utils/math';

const Scores = () => {
  const {
    values: {
      selectedQuiz,
      scoresData,
      scorePage,
      statsPage,
    },
    dataStore: {
      handleOnShowDetails,
      handleOnStatsPageChange,
      handleOnScorePageChange,
    },
  } = useContext(DashboardContext);

  const stats = (selectedQuiz.index > -1) ? scoresData[selectedQuiz.index].questionStats : [];

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

    const success = getPercentage(correct, total);

    const items = [
      name,
      attempts,
      correct,
      total,
      `${success}%`,
    ];

    const detailsButton = (
      <DashboardButton
        onClick={() => {
          handleOnShowDetails(id, index, selectedQuiz.value, last);
        }}
      >
        {__('View Details', 'quizess')}
      </DashboardButton>
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
      className="quiz__options-tables"
    >
      <div
        className="quiz__options-scores"
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
        className="quiz__options-stats"
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

export default Scores;
