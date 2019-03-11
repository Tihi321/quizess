import App from '../sections';
import MenuProvider from './MenuContext';

const MenuStore = (props) => {
  const {
    theme,
  } = props;

  return (
    <MenuProvider
      theme={theme}
    >
      <App />
    </MenuProvider>
  );

};

export default MenuStore;
