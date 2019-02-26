import DashboardProvider from './DashboardContext';
import Dashboard from '../sections';

const DashbordStore = (props) => {

  return (
    <DashboardProvider
    >
      <Dashboard />
    </DashboardProvider>
  );

};

export default DashbordStore;
