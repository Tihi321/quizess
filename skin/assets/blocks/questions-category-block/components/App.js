import BlockElements from './BlockElements';
import BlockOptions from './BlockOptions';

const App = (props) => {
  const {
    className,
  } = props;

  return (
    <div className={className}>
      <BlockOptions />
      <BlockElements />
    </div>
  );
};

export default App;
