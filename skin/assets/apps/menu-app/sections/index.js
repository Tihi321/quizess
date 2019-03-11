import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {MenuConsumer} from '../containers/MenuContext';

const MainConsumer = (props) => {
  const {
    inProgress,
    data,
    handleStart,
  } = props;

  return (
    <Fragment>
      <div>
        koma
      </div>
    </Fragment>
  );
};

const App = () => (
  <MenuConsumer>
    {(value) => {
      const {
        values: {
          data,
          inProgress,
        },
        dataStore: {
          handleStart,
        },
      } = value;
      return (
        <MainConsumer
          data={data}
          handleStart={handleStart}
          inProgress={inProgress}
        />
      );
    }}
  </MenuConsumer>
);

export default App;
