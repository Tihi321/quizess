import {MenuItem} from '../components';

const Menu = (props) => {

  const {
    items,
    theme,
    logo,
  } = props;

  const menuHeader = (
    <div className="menu__header">
      <a className="menu__header__logo" href="/" >
        <img className="menu__header__img" src={logo.url} alt={logo.title} />
      </a>
    </div>
  );

  // this recursive function call itself to create elements for each child element.
  const createMenuItems = (menuChildren) => {

    return menuChildren.map((item, index) => {
      const {
        title,
        url,
        children,
      } = item;

      const subItems = (children.length) && createMenuItems(children);
      const randomKey = Math.floor(Math.random() * Math.floor(1000));

      return (
        <MenuItem
          title={title}
          url={url}
          items={subItems}
          key={randomKey + index}
        >
        </MenuItem>
      );

    });
  };

  const menuItems = createMenuItems(items);

  return (
    <div className={`menu menu--${theme}`}>
      {(logo) && menuHeader}
      <ul className="menu__list">
        {menuItems}
      </ul>
    </div>
  );
};

export default Menu;
