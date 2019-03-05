import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  ToggleSwitch,
  InputRow,
} from '../components';

const GeneralOptionsConsumer = (props) => {
  const {
    dataLoaded,
    useCustomStyle,
    handleUseCustomChange,
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

  return (
    <Fragment>
      {useCustomElement}
    </Fragment>
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
        },
      } = value;
      return (
        <GeneralOptionsConsumer
          dataLoaded={dataLoaded}
          useCustomStyle={useCustomStyle}
          handleUseCustomChange={handleUseCustomChange}
        />
      );
    }}
  </DashboardConsumer>
);

export default GeneralOptions;
