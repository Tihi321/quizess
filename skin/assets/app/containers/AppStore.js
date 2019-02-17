import App from '../sections';
import AppProvider from './AppContext';

const AppStore = (props) => {
  const {
    api,
    theme,
  } = props;

  return (
    <AppProvider
      api={api}
      theme={theme}
    >
      <App />
    </AppProvider>
  );

};

export default AppStore;
