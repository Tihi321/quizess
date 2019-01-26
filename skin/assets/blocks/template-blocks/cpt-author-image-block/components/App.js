import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
  } = props;

  const dispatchAttributesStore = {
    handleOnSelectMedia: (image) => {
      const url = (!image.sizes.thumbnail) ? image.url : image.sizes.thumbnail.url;
      props.dispatchAtributes({
        action: 'image',
        payload: {
          id: image.id,
          url,
          title: image.title,
        },
      });
    },
    handleOnMediaAltChange: (text) => {
      props.dispatchAtributes({
        action: 'alt',
        payload: text,
      });
    },
  };

  return (
    <div
      className={className}
    >
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
