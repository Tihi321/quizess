import App from '../sections';
import MenuProvider from './MenuContext';

const MenuStore = (props) => {

  return (
    <MenuProvider>
      <App />
    </MenuProvider>
  );

};

export default MenuStore;
