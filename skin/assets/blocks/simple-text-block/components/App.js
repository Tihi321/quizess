import classnames from 'classnames';
import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {titlePosition, backgroundColor},
  } = props;

  const dispatchAttributesStore = {
    handleTitleOnChange: (title) => {
      props.dispatchAtributes({
        action: 'title',
        payload: title,
      });
    },
    handleBodyOnChange: (content) => {
      props.dispatchAtributes({
        action: 'body',
        payload: content,
      });
    },
    handleTitlePosition: (value) => {
      props.dispatchAtributes({
        action: 'titlePosition',
        payload: value,
      });
    },
    handleOnBackgroundChange: (value) => {
      props.dispatchAtributes({
        action: 'backgroundColor',
        payload: value,
      });
    },
  };


  return (
    <div
      className={classnames(className, {
        'content-reverse': titlePosition === 'right',
      })}
      style={(backgroundColor) ? {backgroundColor} : {}}>
      <BlockOptions
        titlePosition={titlePosition}
        backgroundColor={backgroundColor}
        dispatchAttributesStore={dispatchAttributesStore}
      />
      <BlockElements
        attributes={props.attributes}
        dispatchAttributesStore={dispatchAttributesStore}
      />
    </div>
  );
};

export default App;
