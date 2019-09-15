import React, {useState, useEffect} from 'react';
import {getMenuData} from '../../../services/menu';

// Set Up The Initial Context
const MenuContext = React.createContext([{}, () => {}]);

const MenuProvider = (props) => {

  const {theme} = props;

  const [inProgress, setInProgress] = useState(true);
  const [items, setItems] = useState([]);
  const [logo, setLogo] = useState(null);

  const parseMenuData = (data) => {

    const outout = {
      logo: JSON.parse(data.logo),
      items: data.menu.items,
    };
    return outout;
  };

  // fetch menu items from endpoint
  const fetchData = () => {
    getMenuData()
      .then((myJson) => {
        const data = parseMenuData(myJson);

        setItems(() => data.items);
        setLogo(() => data.logo);
        setInProgress(() => false);
      });
  };

  const dataStore = {};

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <MenuContext.Provider
      value={{
        values: {
          inProgress,
          items,
          theme,
          logo,
        },
        dataStore,
      }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export {MenuContext, MenuProvider};
