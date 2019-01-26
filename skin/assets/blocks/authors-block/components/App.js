import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {backgroundColor},
    posts,
  } = props;

  const dispatchAttributesStore = {
    handleAuthorsOnChange: (authors) => {
      props.dispatchAtributes({
        action: 'authors',
        payload: JSON.stringify(authors),
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
      className={className}
      style={(backgroundColor) ? {backgroundColor} : {}}>
      <BlockOptions
        posts={posts}
        attributes={props.attributes}
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
