import React, {PureComponent} from 'react';

// Set Up The Initial Context
const BlockContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const BlockConsumer = BlockContext.Consumer;

class BlockProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      data: {},
      modal: false,
    };
  }

  fetchApi = () => {
    const {api} = this.props;
    this.setState(() => {
      return {
        inProgress: true,
      };
    });
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState(() => {
          return {
            inProgress: false,
            data: myJson,
            modal: true,
          };
        });
      });
  };

  dataStore = {
    handleStart: () => {

      // Check if state data is loaded & skip fetch if needed.
      if (Object.entries(this.state.data).length === 0 && this.state.data.constructor === Object) {
        this.fetchApi();
      } else {
        this.setState(() => {
          return {
            modal: true,
          };
        });
      }
    },
    handleClose: () => {
      this.setState(() => {
        return {
          modal: false,
        };
      });
    },
  };

  render() {
    const {
      inProgress,
      data,
      modal,
    } = this.state;

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <BlockContext.Provider
        value={{
          values: {
            inProgress,
            data,
            modal,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </BlockContext.Provider>
    );
  }
}

export default BlockProvider;


