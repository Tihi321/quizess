import {Fragment} from 'react';
import {__} from '@wordpress/i18n';
import {MenuConsumer} from '../containers/MenuContext';
import Menu from './MenuApp';

const MainConsumer = (props) => {
  const {
    inProgress,
    items,
    logo,
    theme,
  } = props;

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

const App = () => (
  <MenuConsumer>
    {(value) => {
      const {
        values: {
          items,
          logo,
          inProgress,
          theme,
        },
      } = value;
      return (
        <MainConsumer
          items={items}
          logo={logo}
          theme={theme}
          inProgress={inProgress}
        />
      );
    }}
  </MenuConsumer>
);

export default App;
