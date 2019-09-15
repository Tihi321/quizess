import {Fragment, useContext} from 'react';
import {MenuContext} from '../containers/MenuContext';
import Menu from './MenuApp';

const App = (props) => {
  const {
    values: {
      items,
      logo,
      inProgress,
      theme,
    },
  } = useContext(MenuContext);

  const menuItems = items.map((value) => {
    return {
      title: value.title,
      url: value.url,
      children: value.children,
    };
  });

  return (
    <Fragment>
      {
        (!inProgress) && <Menu items={menuItems} theme={theme} logo={logo} />
      }
    </Fragment>
  );
};

export default App;
