import App from '../components/App';
import BlockProvider from './BlockContext';

const BlockEdit = (props) => {
  const {
    clientId,
    attributes,
    className,
    setAttributes,
  } = props;

  const dispatchAtributes = ({action, payload}) => {
    switch (action) {
      case 'title':
        setAttributes({
          title: payload,
        });
        break;
      case 'answers':
        setAttributes({
          answers: JSON.stringify(payload),
        });
        break;
      case 'question':
        setAttributes({
          question: payload,
        });
        break;
      case 'backgroundColor':
        setAttributes({
          backgroundColor: payload,
        });
        break;
      case 'fontColor':
        setAttributes({
          fontColor: payload,
        });
        break;
      case 'rows':
        setAttributes({
          rows: payload,
        });
        break;
      case 'theme':
        setAttributes({
          theme: payload,
        });
        break;
      case 'explanationType':
        setAttributes({
          explanationType: payload,
          embed: false,
          explanationMedia: JSON.stringify({
            url: '',
            id: '',
            alt: '',
          }),
        });
        break;
      case 'showExplanation':
        setAttributes({
          showExplanation: payload,
          explanationType: '',
          embed: false,
          explanationMedia: JSON.stringify({
            url: '',
            id: '',
            alt: '',
          }),
        });
        break;
      case 'explanation':
        setAttributes({
          explanation: payload,
        });
        break;
      case 'media':
        setAttributes({
          explanationMedia: JSON.stringify({
            url: payload.url,
            id: payload.id,
            alt: payload.alt,
          }),
        });
        break;
      case 'youtube':
        setAttributes({
          explanationMedia: JSON.stringify({
            url: payload,
            id: '',
            alt: '',
          }),
        });
        break;
      case 'embed':
        if (!payload) {
          setAttributes({
            embed: payload,
          });
        } else {
          setAttributes({
            embed: true,
            explanationMedia: JSON.stringify({
              url: attributes.explanationMedia.url,
              id: payload,
              alt: '',
            }),
          });
        }
        break;
      default:
    }
  };

  return (
    <BlockProvider
      dispatchAtributes={dispatchAtributes}
      attributes={attributes}
      clientId={clientId}
      className={className}
    >
      <App />
    </BlockProvider>
  );
};

export default BlockEdit;
