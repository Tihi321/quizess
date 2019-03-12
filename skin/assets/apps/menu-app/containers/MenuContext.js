/* global quizessOptions, userLogged */
import React, {PureComponent} from 'react';
import generalHelper from '../../../helpers/general-helper';

// Set Up The Initial Context
const MenuContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const MenuConsumer = MenuContext.Consumer;

class MenuProvider extends PureComponent {
  constructor(props) {
    super(props);

    const {theme} = props;

    this.state = {
      theme,
      inProgress: true,
      items: [],
      logo: null,
    };
  }

  parseMenuData = (data) => {
    const {
      logo,
      menu: {
        items,
      },
    } = data;

    const outout = {
      logo: JSON.parse(logo),
      items,
    };
    return outout;
  }

  fetchData = () => {
    const {root} = quizessOptions;
    const {menusApi} = quizessOptions;
    fetch(root + menusApi)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const data = this.parseMenuData(myJson);
        this.setState(() => {
          return {
            logo: data.logo,
            items: data.items,
            inProgress: false,
          };
        });
      });
  }

  dataStore = {};

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      inProgress,
      items,
      theme,
      logo,
    } = this.state;

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <MenuContext.Provider
        value={{
          values: {
            inProgress,
            items,
            theme,
            logo,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}

export default MenuProvider;
