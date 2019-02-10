import classnames from 'classnames';
import BlockElements from './BlockElements';
import BlockOptions from './BlockOptions';
import {BlockConsumer} from '../containers/BlockContext';

const AppConsumer = (props) => {
  const {
    values: {
      blockClass,
      className,
      backgroundColor,
      fontColor,
      templateBlock,
    },
  } = props;

  const blockStyle = (!templateBlock) ? {
    backgroundColor: backgroundColor || false,
    color: fontColor || false,
  } : {};

  return (
    <div
      className={classnames(
        className,
        blockClass,
      )}
      style={blockStyle}>
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
            blockClass,
            fontColor,
            templateBlock,
          },
          className,
        },
      } = value;
      return (
        <AppConsumer
          values={{
            templateBlock,
            blockClass,
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
