import classnames from 'classnames';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {classWrap},
  } = props;

  return (
    <div
      className={classnames(
        (classWrap),
        className,
      )}>
      <BlockElements
        attributes={props.attributes}
      />
    </div>
  );
};

export default App;
