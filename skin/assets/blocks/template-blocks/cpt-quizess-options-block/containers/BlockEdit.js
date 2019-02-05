import App from '../components/App';

const BlockEdit = (props) => {
  const {
    attributes,
    className,
    setAttributes,
  } = props;

  const dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'useTimer':
        setAttributes({
          useTimer: payload,
        });
        break;
      case 'timer':
        setAttributes({
          timer: payload,
        });
        break;
      case 'successMessage':
        setAttributes({
          successMessage: payload,
        });
        break;
      case 'welcomeMessage':
        setAttributes({
          welcomeMessage: payload,
        });
        break;
      case 'failureMessage':
        setAttributes({
          failureMessage: payload,
        });
        break;
      case 'theme':
        setAttributes({
          theme: payload,
        });
        break;
      case 'aboutField':
        setAttributes({
          aboutField: payload,
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
