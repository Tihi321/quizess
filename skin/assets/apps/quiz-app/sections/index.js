import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {AppConsumer} from '../containers/AppContext';
import Modal from './Modal';
import Questions from './Questions';
import {
  Button,
  Placeholder,
} from '../../../components';

const MainConsumer = (props) => {
  const {
    theme,
    data,
    handleStart,
    shoudNotPlay,
  } = props;

  const shouldNotPlayElement = (
    <Placeholder type="info">
      {__('Your scores have been submitted, thank you for playing.', 'quizess')}
    </Placeholder>
  );

  const modalElement = (
    <Modal>
      {(shoudNotPlay) ? shouldNotPlayElement : <Questions />}
    </Modal>
  );

  return (
    <Fragment>
      <Button
        theme={theme}
        onClick={handleStart}
      >
        {__('Start', 'quizess')}
      </Button>
      {(Object.entries(data).length > 0) && modalElement}
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
          shoudNotPlay,
        },
        dataStore: {
          handleStart,
        },
      } = value;
      return (
        <MainConsumer
          data={data}
          handleStart={handleStart}
          theme={theme}
          shoudNotPlay={shoudNotPlay}
        />
      );
    }}
  </AppConsumer>
);

export default App;
