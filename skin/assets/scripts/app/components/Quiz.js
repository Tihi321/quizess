import {BlockConsumer} from '../containers/BlockContext';

const QuizConsumer = (props) => {

  console.log(props);

};

const Quiz = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          modal,
          data,
        },
        dataStore,
      } = value;
      return (
        <QuizConsumer
          values={{
            data,
            modal,
            dataStore,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default Quiz;
