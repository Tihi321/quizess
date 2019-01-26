import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    dispatchAtributes,
  } = props;


  const dispatchAttributesStore = {
    handleLinkOnChange: (link) => {
      dispatchAtributes({
        action: 'link',
        payload: link,
      });
    },
  };

  return (
    <div
      className={className}
    >
      <BlockElements
        attributes={props.attributes}
        dispatchAttributesStore={dispatchAttributesStore}
      />
    </div>
  );
};

export default App;
