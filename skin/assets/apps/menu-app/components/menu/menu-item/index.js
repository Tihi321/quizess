import {Component} from 'react';
import {
  CSSTransition,
} from 'react-transition-group';
import {MenuItemTitle} from '../../index';

class MenuItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasSubmenuOpen: false,
    };
  }


  handleClickOnSubMenuLink = (event) => {
    event.preventDefault();
    const {items} = this.props;

    if (items) {
      const {hasSubmenuOpen} = this.state;
      this.setState(() => {
        return {
          hasSubmenuOpen: !hasSubmenuOpen,
        };
      });
    }

  }

  render() {
    const {
      title,
      url,
      items,
    } = this.props;

    const {hasSubmenuOpen} = this.state;
    const hasSubItems = (items) || false;

    return (
      <li
        className={`menu__item${hasSubItems ? ' has-subitems' : ''}${hasSubmenuOpen ? ' has-menu-open' : ''}`}
      >
        <a
          href={url}
          className="menu__item__link"
          onClick={this.handleClickOnSubMenuLink}
        >
          <MenuItemTitle title={title} />
        </a>
        {hasSubItems && (
          <CSSTransition
            in={hasSubmenuOpen}
            timeout={{
              enter: 200,
              exit: 200,
            }}
            classNames="menu__submenu"
            unmountOnExit
          >
            <ul
              className="menu__submenu"
            >
              {items}
            </ul>
          </CSSTransition>
        )}
      </li>
    );

  }
}

export default MenuItem;
