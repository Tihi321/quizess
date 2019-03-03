import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  TableParent,
  TableItems,
  Dialog,
} from '../components';
import generalHelper from '../../helpers/general-helper';

const DetailsConsumer = (props) => {
  const {
    selectedPlayerDetails: {
      playerId,
      playerIndex,
      quizId,
      lastScoreStats,
    },
    answerStatsPage,
    showRemove,
    handleOnCloseDetails,
    handleOnShowRemove,
    handleOnRemoveLastScore,
    handleOnAnswerPageChange,
    handleOnRemove,
    handleOnCancelRemove,
  } = props;

  if (showRemove) {
    return <Dialog
      message={__('It will delete all records from player', 'quizess')}
      onConfirm={() => {
        handleOnRemove(playerId, quizId, playerIndex);
      }}
      onCancel={handleOnCancelRemove}
    />;
  }

  const unrecorded = __('Unrecorded', 'quizess');

  const answers = (lastScoreStats) ? lastScoreStats.answers : [];
  const correct = (lastScoreStats) ? lastScoreStats.correct : unrecorded;
  const total = (lastScoreStats) ? lastScoreStats.total : unrecorded;
  const success = (lastScoreStats) ? `${generalHelper.getPercentage(correct, total)}%` : unrecorded;

  const lastScoreItems = [
    correct,
    total,
    success,
  ];

  const lastScoreTitles = [
    __('Correct', 'quizess'),
    __('Total', 'quizess'),
    __('Success', 'quizess'),
    '',
    '',
  ];

  const removeLastButton = (
    <div className="dashboard__table__inner">
      <button
        className="dashboard__table__button"
        onClick={() => {
          handleOnRemoveLastScore(playerId, quizId, playerIndex);
        }}
      >
        {__('Remove', 'quizess')}
      </button>
    </div>
  );

  const showRemoveButton = (
    <div className="dashboard__table__inner">
      <button
        className="dashboard__table__button"
        onClick={handleOnShowRemove}
      >
        {__('Delete', 'quizess')}
      </button>
    </div>
  );

  const lastScoresElement = (
    <TableItems
      className="dashboard__table"
      items={lastScoreItems}
    >
      {removeLastButton}
      {showRemoveButton}
    </TableItems>
  );

  const lastScoreParentElement = (
    <div
      className="dashboard__scores"
    >
      <TableParent
        className="dashboard__table"
        titles={lastScoreTitles}
      >
        {lastScoresElement}
      </TableParent>
    </div>
  );



  const answerStatsTitles = [
    __('Question', 'quizess'),
    __('Answer', 'quizess'),
    __('Correct', 'quizess'),
  ];

  const answersElements = answers.map((answer, index) => {
    const {
      number,
      correct: answerCorrect,
    } = answer;
    const items = [
      index + 1,
      number,
      (answerCorrect === 1) ? __('Correct', 'quizess') : __('Incorrect', 'quizess'),
    ];
    return (
      <TableItems
        className="dashboard__table"
        key={index}
        items={items}
      >
      </TableItems>
    );
  });


  const answersParentElement = (
    <div
      className="dashboard__stats"
    >
      <TableParent
        className="dashboard__table"
        pagination={true}
        titles={answerStatsTitles}
        items={10}
        page={answerStatsPage}
        onPageChange={handleOnAnswerPageChange}
      >
        {answersElements}
      </TableParent>
    </div>
  );

  const backButton = (
    <div className="dashboard__table__inner">
      <button
        className="dashboard__table__button"
        onClick={handleOnCloseDetails}
      >
        {__('Back', 'quizess')}
      </button>
    </div>
  );

  return (
    <div className="dashboard__details">
      <div className="details__content">
        {backButton}
        {lastScoreParentElement}
        {answersParentElement}
      </div>
    </div>
  );
};

const Details = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          selectedPlayerDetails,
          answerStatsPage,
          showRemove,
        },
        dataStore: {
          handleOnCloseDetails,
          handleOnShowRemove,
          handleOnRemoveLastScore,
          handleOnAnswerPageChange,
          handleOnRemove,
          handleOnCancelRemove,
        },
      } = value;
      return (
        <DetailsConsumer
          showRemove={showRemove}
          selectedPlayerDetails={selectedPlayerDetails}
          answerStatsPage={answerStatsPage}
          handleOnAnswerPageChange={handleOnAnswerPageChange}
          handleOnCloseDetails={handleOnCloseDetails}
          handleOnShowRemove={handleOnShowRemove}
          handleOnRemoveLastScore={handleOnRemoveLastScore}
          handleOnRemove={handleOnRemove}
          handleOnCancelRemove={handleOnCancelRemove}
        />
      );
    }}
  </DashboardConsumer>
);

export default Details;
