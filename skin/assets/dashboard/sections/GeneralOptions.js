import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';

const GeneralOptionsConsumer = (props) => {
  const {
    dataLoaded,
  } = props;

  return (
    <Fragment>
      <div>
        General options
      </div>
    </Fragment>
  );
};

const GeneralOptions = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          dataLoaded,
        },
      } = value;
      return (
        <GeneralOptionsConsumer
          dataLoaded={dataLoaded}
        />
      );
    }}
  </DashboardConsumer>
);

export default GeneralOptions;
