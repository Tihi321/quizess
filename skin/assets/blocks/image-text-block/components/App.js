import classnames from 'classnames';
import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {mediaPosition, backgroundColor},
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
    handleMediaPosition: (value) => {
      props.dispatchAtributes({
        action: 'mediaPosition',
        payload: value,
      });
    },
    handleOnBackgroundChange: (value) => {
      props.dispatchAtributes({
        action: 'backgroundColor',
        payload: value,
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
    handleBottomOnChange: (content) => {
      props.dispatchAtributes({
        action: 'bottomContent',
        payload: content,
      });
    },
    handleHoursRange: (value) => {
      props.dispatchAtributes({
        action: 'hoursWorked',
        payload: value,
      });
    },
    handleHoursChecked: (value) => {
      props.dispatchAtributes({
        action: 'hoursChecked',
        payload: value,
      });
    },
    handleFontsChecked: (value) => {
      props.dispatchAtributes({
        action: 'fontsChecked',
        payload: value,
      });
    },
    handleFontsUsed: (fonts) => {
      props.dispatchAtributes({
        action: 'fontsUsed',
        payload: fonts,
      });
    },
    handleBodyContentChecked: (value) => {
      props.dispatchAtributes({
        action: 'bodyContentChecked',
        payload: value,
      });
    },
    handleBottomContentChecked: (value) => {
      props.dispatchAtributes({
        action: 'bottomContentChecked',
        payload: value,
      });
    },
  };

  return (
    <div
      className={classnames(className, {
        'content-reverse': mediaPosition === 'right',
      })}
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
