import {Fragment} from 'react';
import Select from 'react-select';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import Scores from './Scores';

const MainConsumer = (props) => {
  const {
    dataLoaded,
    scoresData,
    handleScoresSelect,
    selectedQuiz,
  } = props;

  const quizSelectElement = (
    <Select
      className="quiz-select"
      closeMenuOnSelect={true}
      value={(selectedQuiz) ? selectedQuiz.value : false}
      onChange={handleScoresSelect}
      options={scoresData}
      placeholder={__('Select', 'quizess')}
    />
  );

  return (
    <Fragment>
      <h1 className="dashboard__title">
        {__('Dashboard', 'quizess')}
      </h1>
      {(dataLoaded) && quizSelectElement}
      <Scores />
    </Fragment>
  );
};

const Dashboard = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          scoresData,
          dataLoaded,
          selectedQuiz,
        },
        dataStore: {
          handleScoresSelect,
        },
      } = value;
      return (
        <MainConsumer
          dataLoaded={dataLoaded}
          scoresData={scoresData}
          handleScoresSelect={handleScoresSelect}
          selectedQuiz={selectedQuiz}
        />
      );
    }}
  </DashboardConsumer>
);

export default Dashboard;
