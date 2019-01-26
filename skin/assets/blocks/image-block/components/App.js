import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {backgroundColor},
  } = props;

  const dispatchAttributesStore = {
    handleOnSelectMedia: (media) => {
      props.dispatchAtributes({
        action: 'media',
        payload: {
          id: media.id,
          url: media.url,
          title: media.title,
        },
      });
    },
    handleOnMediaAltChange: (text) => {
      props.dispatchAtributes({
        action: 'mediaAlt',
        payload: text,
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
