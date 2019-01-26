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
    handleCustomFileTypeOnChange: (customFileType) => {
      props.dispatchAtributes({
        action: 'customFileType',
        payload: customFileType,
      });
    },
    handleUseCustomFileTypeOnChange: (useCustomFileType) => {
      props.dispatchAtributes({
        action: 'useCustomFileType',
        payload: useCustomFileType,
      });
    },
    handleOnFileChange: (file) => {
      props.dispatchAtributes({
        action: 'fileChange',
        payload: {
          id: file.id,
          url: file.url,
          title: file.title,
        },
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
    handleResourceOnChange: (resource) => {
      props.dispatchAtributes({
        action: 'resource',
        payload: resource,
      });
    },
    handleDescriptionOnChange: (description) => {
      props.dispatchAtributes({
        action: 'description',
        payload: description,
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
