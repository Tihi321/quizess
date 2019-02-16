import React, {PureComponent} from 'react';
import devices from '../../helpers/devices';
import generalHelper from '../../helpers/general-helper';
import quizHelper from '../../helpers/quiz-helper';
import selectors from '../../helpers/selectors';

// Set Up The Initial Context
const BlockContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const BlockConsumer = BlockContext.Consumer;

class BlockProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.$body = selectors.getBody();
    this.isIphone = devices.iPhone();

    const {theme} = props;

    this.state = {
      theme,
      inProgress: false,
      data: {},
      modal: false,
      current: 0,
    };
  }

  setBody = () => {
    if (this.isIphone) {
      this.scrollPosition = window.pageYOffset;
    }
    setTimeout(() => {
      this.$body.classList.add(generalHelper.getBodyActiveClass(this.isIphone));
    }, 300);
  }

  unSetBody = () => {
    if (this.isIphone) {
      this.scrollPosition = window.pageYOffset;
    }
    setTimeout(() => {
      this.$body.classList.remove(generalHelper.getBodyActiveClass(this.isIphone));
    }, 300);
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
        const data = quizHelper.parseQuizData(myJson);
        this.setState(() => {
          return {
            inProgress: false,
            data,
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
        this.setBody();
      } else {
        this.setState(() => {
          return {
            modal: true,
          };
        });
        this.setBody();
      }
    },
    handleClose: () => {
      this.unSetBody();
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
      theme,
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
            theme,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </BlockContext.Provider>
    );
  }
}

export default BlockProvider;


