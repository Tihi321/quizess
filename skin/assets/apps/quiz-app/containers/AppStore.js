import App from '../sections';
import AppProvider from './AppContext';

const AppStore = (props) => {
  const {
    theme,
    quizId,
    userSubmit,
    headerElement,
  } = props;

  return (
    <AppProvider
      theme={theme}
      quizId={quizId}
      userSubmit={userSubmit}
      headerElement={headerElement}
    >
      <App />
    </AppProvider>
  );

};

export default AppStore;
