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
  } = props;

  const quizSelectElement = (
    <Select
      className="columns-select"
      closeMenuOnSelect={true}
      value={scoresData[0]}
      onChange={handleScoresSelect}
      options={scoresData}
      placeholder={__('Select', 'quizess')}
    />
  );

  return (
    <Fragment>
      <h1>
        This is dashboard
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
        />
      );
    }}
  </DashboardConsumer>
);

export default Dashboard;
