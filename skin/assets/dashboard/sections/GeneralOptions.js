import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  ToggleSwitch,
  InputRow,
  DashboardButton,
  RowContainer,
} from '../components';

const GeneralOptionsConsumer = (props) => {
  const {
    dataLoaded,
    useCustomStyle,
    handleUseCustomChange,
    handleOnSave,
  } = props;

  const useCustomElement = (
    <InputRow>
      <ToggleSwitch
        idName="custom-slides"
        label={__('Use custom styles', 'quizess')}
        checked={useCustomStyle}
        onChange={handleUseCustomChange}
      />
    </InputRow>
  );

  const saveButtonElement = (
    <RowContainer>
      <DashboardButton
        onClick={handleOnSave}
        size="big"
      >
        {__('Save', 'quizess')}
      </DashboardButton>
    </RowContainer>
  );

  return (
    <div
      className="general__options"
    >
      <div
        className="general__options--top"
      >
        {useCustomElement}
      </div>
      <div
        className="general__options--bottom"
      >
        {saveButtonElement}
      </div>
    </div>
  );
};

const GeneralOptions = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          dataLoaded,
          useCustomStyle,
        },
        dataStore: {
          handleUseCustomChange,
          handleOnSave,
        },
      } = value;
      return (
        <GeneralOptionsConsumer
          dataLoaded={dataLoaded}
          useCustomStyle={useCustomStyle}
          handleUseCustomChange={handleUseCustomChange}
          handleOnSave={handleOnSave}
        />
      );
    }}
  </DashboardConsumer>
);

export default GeneralOptions;
