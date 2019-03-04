import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';

const GeneralOptionsConsumer = (props) => {
  const {
    dataLoaded,
    useCustomStyle,
    handleUseCustomChange,
  } = props;

  const useCustomElement = (
    <div
      className="qz-panel-group"
    >
      <div
        className="components-panel__row"
      >
        <label
          htmlFor="track-scores-checkbox-id"
          className="toggle-switch__label"
        >
          {__('Use custom styles', 'quizess')}
        </label>
        <div
          className="toggle-switch"
        >
          <input
            className="toggle-switch__input"
            id="track-scores-checkbox-id"
            type="checkbox"
            checked={useCustomStyle}
            onChange={() => handleUseCustomChange(!useCustomStyle)}
          />
          <span className="toggle-switch__slider"></span>
        </div>
      </div>
    </div>
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
