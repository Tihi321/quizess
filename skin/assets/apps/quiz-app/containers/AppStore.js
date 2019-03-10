import App from '../sections';
import AppProvider from './AppContext';

const AppStore = (props) => {
  const {
    theme,
    quizId,
    userSubmit,
  } = props;

  return (
    <AppProvider
      theme={theme}
      quizId={quizId}
      userSubmit={userSubmit}
    >
      <App />
    </AppProvider>
  );

};

export default AppStore;
