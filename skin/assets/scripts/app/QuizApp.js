import App from './components/App';
import BlockProvider from './containers/BlockContext';

const QuizApp = (props) => {
  const {
    api,
  } = props;

  return (
    <BlockProvider
      api={api}
    >
      <App />
    </BlockProvider>
  );

};

export default QuizApp;
