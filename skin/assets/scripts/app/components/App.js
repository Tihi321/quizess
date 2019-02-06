import {BlockConsumer} from '../containers/BlockContext';

const AppConsumer = (props) => {
  const {
    values: {
      inProgress,
      data,
      dataStore: {
        handleFetchApi,
      },
    },
  } = props;

  return (
    <button
      onClick={handleFetchApi}
      className="quiz__button--btn">
      Start
    </button>
  );
};

const App = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          inProgress,
          data,
        },
        dataStore,
      } = value;
      return (
        <AppConsumer
          values={{
            inProgress,
            data,
            dataStore,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default App;
