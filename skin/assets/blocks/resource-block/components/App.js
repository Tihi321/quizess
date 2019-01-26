import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {backgroundColor},
  } = props;

  const dispatchAttributesStore = {
    handleCustomDomainOnChange: (customDomain) => {
      props.dispatchAtributes({
        action: 'customDomain',
        payload: customDomain,
      });
    },
    handleUseCustomDomainOnChange: (useCustomDomain) => {
      props.dispatchAtributes({
        action: 'useCustomDomain',
        payload: useCustomDomain,
      });
    },
    handleLinkTextOnChange: (linkText) => {
      props.dispatchAtributes({
        action: 'linkText',
        payload: linkText,
      });
    },
    handleLinkOnChange: (link) => {
      props.dispatchAtributes({
        action: 'link',
        payload: link,
      });
    },
    handleTitleOnChange: (title) => {
      props.dispatchAtributes({
        action: 'title',
        payload: title,
      });
    },
    handleshowTitle: (showTitle) => {
      props.dispatchAtributes({
        action: 'showTitle',
        payload: showTitle,
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
