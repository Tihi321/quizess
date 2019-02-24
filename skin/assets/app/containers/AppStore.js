import App from '../sections';
import AppProvider from './AppContext';

const AppStore = (props) => {
  const {
    theme,
    quizId,
  } = props;

  return (
    <AppProvider
      theme={theme}
      quizId={quizId}
    >
      <App />
    </AppProvider>
  );

};

export default AppStore;
