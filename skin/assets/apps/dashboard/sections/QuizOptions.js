import Select from 'react-select';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import Scores from './Scores';
import Details from './Details';

const QuizOptionsConsumer = (props) => {
  const {
    dataLoaded,
    scoresData,
    handleScoresSelect,
    selectedQuiz,
    showDetails,
  } = props;

  if (showDetails) {
    return <Details />;
  }


  const quizSelectElement = (
    <Select
      className="dashboard__quiz-select"
      closeMenuOnSelect={true}
      value={(selectedQuiz.label) ? selectedQuiz : false}
      onChange={handleScoresSelect}
      options={scoresData}
      placeholder={__('Select', 'quizess')}
    />
  );

  return (
    <div
      className="quiz__options"
    >
      {(dataLoaded) && quizSelectElement}
      <Scores />
    </div>
  );
};

const QuizOptions = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          scoresData,
          dataLoaded,
          selectedQuiz,
          showDetails,
        },
        dataStore: {
          handleScoresSelect,
        },
      } = value;
      return (
        <QuizOptionsConsumer
          dataLoaded={dataLoaded}
          showDetails={showDetails}
          scoresData={scoresData}
          handleScoresSelect={handleScoresSelect}
          selectedQuiz={selectedQuiz}
        />
      );
    }}
  </DashboardConsumer>
);

export default QuizOptions;
