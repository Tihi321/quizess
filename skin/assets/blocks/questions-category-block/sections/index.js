import classnames from 'classnames';
import BlockElements from './BlockElements';
import BlockOptions from './BlockOptions';
import {BlockConsumer} from '../containers/BlockContext';

const AppConsumer = (props) => {
  const {
    values: {
      className,
      blockClass,
    },
  } = props;

  return (
    <div
      className={classnames(
        className,
        blockClass,
      )}
    >
      <BlockOptions />
      <BlockElements />
    </div>
  );
};

const App = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            blockClass,
          },
          className,
        },
      } = value;
      return (
        <AppConsumer
          values={{
            blockClass,
            className,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default App;
