import {Fragment} from 'react';
import {AppConsumer} from '../containers/AppContext';
import Modal from './Modal';
import {Button} from '../components';

const MainConsumer = (props) => {
  const {
    values: {
      data,
      theme,
      dataStore: {
        handleStart,
      },
    },
  } = props;

  return (
    <Fragment>
      <Button
        theme={theme}
        onClick={handleStart}
      >
        Start
      </Button>
      {(Object.entries(data).length > 0) && <Modal />}
    </Fragment>
  );
};

const App = () => (
  <AppConsumer>
    {(value) => {
      const {
        values: {
          data,
          theme,
        },
        dataStore,
      } = value;
      return (
        <MainConsumer
          values={{
            data,
            dataStore,
            theme,
          }}
        />
      );
    }}
  </AppConsumer>
);

export default App;
