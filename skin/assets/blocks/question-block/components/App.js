import BlockElements from './BlockElements';
import BlockOptions from './BlockOptions';
import {BlockConsumer} from '../containers/BlockContext';

const AppConsumer = (props) => {
  const {
    values: {
      className,
      backgroundColor,
      fontColor,
    },
  } = props;

  return (
    <div
      className={className}
      style={{
        backgroundColor: backgroundColor || false,
        color: fontColor || false,
      }}>
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
            backgroundColor,
            fontColor,
          },
          className,
        },
      } = value;
      return (
        <AppConsumer
          values={{
            backgroundColor,
            fontColor,
            className,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default App;
