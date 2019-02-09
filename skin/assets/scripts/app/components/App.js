import {Fragment} from 'react';
import {BlockConsumer} from '../containers/BlockContext';
import Modal from './Modal';

const AppConsumer = (props) => {
  const {
    values: {
      data,
      dataStore: {
        handleStart,
      },
    },
  } = props;

  return (
    <Fragment>
      <button
        onClick={handleStart}
        className="quiz__button--btn">
        Start
      </button>
      {(Object.entries(data).length > 0) && <Modal />}
    </Fragment>
  );
};

const App = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          data,
        },
        dataStore,
      } = value;
      return (
        <AppConsumer
          values={{
            data,
            dataStore,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default App;
