import App from '../components/App';

const BlockEdit = (props) => {
  const {
    attributes,
    className,
    setAttributes,
  } = props;

  const dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'backgroundColor':
        setAttributes({
          backgroundColor: payload,
        });
        break;
      case 'image':
        setAttributes({
          id: payload.id,
          url: payload.url,
          title: payload.title,
        });
        break;
      case 'alt':
        setAttributes({
          alt: payload,
        });
        break;
      default:
    }
  };

  return (
    <App className={className} attributes={attributes} dispatchAtributes={dispatchAtributes} />
  );
};

export default BlockEdit;
