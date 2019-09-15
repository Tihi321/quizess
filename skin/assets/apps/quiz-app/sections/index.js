import {Fragment, useContext} from 'react';
import {__} from '@wordpress/i18n';
import {AppContext} from '../containers/AppContext';
import Modal from './Modal';
import Questions from './Questions';
import {
  Button,
  Placeholder,
} from '../../../components';

const App = () => {
  const {
    values: {
      data,
      theme,
      shoudNotPlay,
    },
    dataStore: {
      handleStart,
    },
  } = useContext(AppContext);

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

export default App;
