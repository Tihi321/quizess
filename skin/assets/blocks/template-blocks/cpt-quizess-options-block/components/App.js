import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
  } = props;

  const dispatchAttributesStore = {
    handleUseTimerChange: (timer) => {
      props.dispatchAtributes({
        action: 'useTimer',
        payload: timer,
      });
    },
    handleTimerChange: (timer) => {
      props.dispatchAtributes({
        action: 'timer',
        payload: timer,
      });
    },
    handleSuccessMessageChange: (message) => {
      props.dispatchAtributes({
        action: 'successMessage',
        payload: message,
      });
    },
    handleFailureMessageChange: (message) => {
      props.dispatchAtributes({
        action: 'failureMessage',
        payload: message,
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
