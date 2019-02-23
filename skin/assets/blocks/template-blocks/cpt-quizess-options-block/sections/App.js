import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    dispatchAtributes,
  } = props;

  const dispatchAttributesStore = {
    handleMetaValueChange: (metaValue) => {
      dispatchAtributes({
        action: 'metaValue',
        payload: metaValue,
      });
    },
    handleUseTimerChange: (timer) => {
      dispatchAtributes({
        action: 'useTimer',
        payload: timer,
      });
    },
    handleTimerChange: (timer) => {
      dispatchAtributes({
        action: 'timer',
        payload: timer,
      });
    },
    handleSuccessMessageChange: (message) => {
      dispatchAtributes({
        action: 'successMessage',
        payload: message,
      });
    },
    handleFailureMessageChange: (message) => {
      dispatchAtributes({
        action: 'failureMessage',
        payload: message,
      });
    },
    handleWelcomeMessageChange: (message) => {
      dispatchAtributes({
        action: 'welcomeMessage',
        payload: message,
      });
    },
    handleThemeChange: (theme) => {
      dispatchAtributes({
        action: 'theme',
        payload: JSON.stringify(theme),
      });
    },
    handleAboutChange: (about) => {
      dispatchAtributes({
        action: 'aboutField',
        payload: about,
      });
    },
  };

  return (
    <div
      className={className}
    >
      <BlockElements
        attributes={props.attributes}
        dispatchAttributesStore={dispatchAttributesStore}
      />
    </div>
  );
};

export default App;
