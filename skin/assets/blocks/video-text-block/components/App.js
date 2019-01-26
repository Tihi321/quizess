import classnames from 'classnames';
import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {theme},
  } = props;

  const dispatchAttributesStore = {
    handleOnSelectMedia: (media) => {
      props.dispatchAtributes({
        action: 'media',
        payload: {
          url: media.url,
          id: media.id,
        },
      });
    },
    handleTitleOnChange: (title) => {
      props.dispatchAtributes({
        action: 'title',
        payload: title,
      });
    },
    handleBodyOnChange: (content) => {
      props.dispatchAtributes({
        action: 'bodyContent',
        payload: content,
      });
    },
    handleBodyContentChecked: (value) => {
      props.dispatchAtributes({
        action: 'bodyContentChecked',
        payload: value,
      });
    },
    handleTitleChecked: (value) => {
      props.dispatchAtributes({
        action: 'titleChecked',
        payload: value,
      });
    },
    handleThemeChange: (value) => {
      props.dispatchAtributes({
        action: 'theme',
        payload: value,
      });
    },
    handleSourceTypeChange: (value) => {
      props.dispatchAtributes({
        action: 'sourceType',
        payload: value,
      });
    },
    handleYoutubeUrlChange: (value) => {
      props.dispatchAtributes({
        action: 'youtubeUrl',
        payload: value,
      });
    },
    handleShowEmbed: (value) => {
      props.dispatchAtributes({
        action: 'showEmbed',
        payload: value,
      });
    },
  };

  return (
    <div
      className={classnames(className, theme)}>
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
