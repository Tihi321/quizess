import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {MenuConsumer} from '../containers/MenuContext';

const MainConsumer = (props) => {
  const {
    inProgress,
    items,
    theme,
    handleStart,
  } = props;

  return (
    <Fragment>
      <div>
        Menu
      </div>
    </Fragment>
  );
};

const App = () => (
  <MenuConsumer>
    {(value) => {
      const {
        values: {
          items,
          inProgress,
          theme,
        },
        dataStore: {
          handleStart,
        },
      } = value;
      return (
        <MainConsumer
          items={items}
          theme={theme}
          handleStart={handleStart}
          inProgress={inProgress}
        />
      );
    }}
  </MenuConsumer>
);

export default App;
