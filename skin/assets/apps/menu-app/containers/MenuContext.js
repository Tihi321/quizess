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

    this.state = {
      inProgress: false,
      data: {},
    };
  }

  parseMenuData = (data) => {
    const {
      logo,
      menu,
    } = data;

    const outout = {
      logo: JSON.parse(logo),
      menu,
    };
    return outout;
  }

  fetchData = () => {
    const {root} = quizessOptions;
    const {menusApi} = quizessOptions;
    this.setState(() => {
      return {
        inProgress: true,
      };
    });
    fetch(root + menusApi)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const menu = this.parseMenuData(myJson);

      });
  }

  dataStore = {
    handleStart: () => {

    },
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      inProgress,
      data,
    } = this.state;

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <MenuContext.Provider
        value={{
          values: {
            inProgress,
            data,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}

export default MenuProvider;
