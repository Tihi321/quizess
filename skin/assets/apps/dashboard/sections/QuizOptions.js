import {useContext} from 'react';
import Select from 'react-select';
import {__} from '@wordpress/i18n';
import {DashboardContext} from '../containers/DashboardContext';
import Scores from './Scores';
import Details from './Details';

const QuizOptions = () => {
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
  } = useContext(DashboardContext);

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

export default QuizOptions;
