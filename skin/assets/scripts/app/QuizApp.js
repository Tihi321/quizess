import App from './components/App';
import BlockProvider from './containers/BlockContext';

const QuizApp = (props) => {
  const {
    api,
    theme,
  } = props;

  return (
    <BlockProvider
      api={api}
      theme={theme}
    >
      <App />
    </BlockProvider>
  );

};

export default QuizApp;
