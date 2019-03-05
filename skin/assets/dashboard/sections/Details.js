import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  TableParent,
  TableItems,
  Dialog,
  DashboardButton,
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
    return <div className="details__dialog">
      <Dialog
        message={__('It will delete all records from player', 'quizess')}
        onConfirm={() => {
          handleOnRemove(playerId, quizId, playerIndex);
        }}
        onCancel={handleOnCancelRemove}
      />
    </div>;
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
    <DashboardButton
      onClick={() => {
        handleOnRemoveLastScore(playerId, quizId, playerIndex);
      }}
      warning={true}
    >
      {__('Remove', 'quizess')}
    </DashboardButton>
  );

  const showRemoveButton = (
    <DashboardButton
      onClick={handleOnShowRemove}
      warning={true}
    >
      {__('Delete', 'quizess')}
    </DashboardButton>
  );

  const lastScoresElement = (
    <TableItems
      items={lastScoreItems}
    >
      {removeLastButton}
      {showRemoveButton}
    </TableItems>
  );

  const lastScoreParentElement = (
    <div
      className="quiz__options-scores"
    >
      <TableParent
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
        key={index}
        items={items}
      >
      </TableItems>
    );
  });


  const answersParentElement = (
    <div
      className="quiz__options-stats"
    >
      <TableParent
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
    <div className="details__back-outer">
      <button
        className="details__back-button dashboard__button--primary"
        onClick={handleOnCloseDetails}
      >
        {__('Back', 'quizess')}
      </button>
    </div>
  );

  return (
    <Fragment>
      <div className="details__content">
        {backButton}
        {lastScoreParentElement}
        {answersParentElement}
      </div>
    </Fragment>
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
