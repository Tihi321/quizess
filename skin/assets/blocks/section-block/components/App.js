import classnames from 'classnames';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {
      blockClass,
      wrapClass,
    },
  } = props;

  return (
    <div
      className={classnames(
        className,
        blockClass,
        wrapClass || false,
      )}>
      <BlockElements
        attributes={props.attributes}
      />
    </div>
  );
};

export default App;
