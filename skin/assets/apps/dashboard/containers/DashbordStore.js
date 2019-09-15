import {DashboardProvider} from './DashboardContext';
import Dashboard from '../sections';

const DashbordStore = (props) => {
  const {messageElementSelector, messageTextSelector} = props;

  return (
    <DashboardProvider
      messageElementSelector={messageElementSelector}
      messageTextSelector={messageTextSelector}
    >
      <Dashboard />
    </DashboardProvider>
  );

};

export default DashbordStore;
