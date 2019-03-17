/* global quizessDashboard */
import React, {PureComponent} from 'react';
import generalHelpers from '../../../helpers/general-helper';

// Set Up The Initial Context
const DashboardContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const DashboardConsumer = DashboardContext.Consumer;

class DashboardProvider extends PureComponent {
  constructor(props) {
    super(props);

    // Elements for the submit message. Outside of react, ou in the real DOM.
    this.messageElement = document.querySelector(props.messageElementSelector);
    this.messageTextElement = document.querySelector(props.messageTextSelector);

    this.state = {
      dataLoaded: false,
      scoresData: [],
      optionsPage: {
        id: 0,
        title: 'Settings',
      },
      selectedQuiz: {
        value: 0,
        label: '',
        data: [],
        index: -1,
      },
      selectedPlayerDetails: {
        playerId: -1,
        playerIndex: -1,
        quizId: -1,
        lastScoreStats: {},
      },
      logo: {
        id: -1,
        url: '',
        title: '',
      },
      copyright: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
      instagram: '',
      showDetails: false,
      removeAdminBar: false,
      showRemove: false,
      useCustomStyle: false,
      showGithub: false,
      statsPage: 0,
      answerStatsPage: 0,
      scorePage: 0,
    };

  }

  // Parse scores data for quizess page in dashboard. Returns array appended with players id.
  parseScoresData = (data) => {

    const quizArray = Object.keys(data).map((key, index) => {

      const statsArray = Object.keys(data[key].players).map((playerId) => {
        return {
          ...data[key].players[playerId],
          id: playerId,
        };
      });

      return {
        value: key,
        label: data[key].title,
        stats: statsArray,
        quizIndex: index,
        questionStats: data[key].stats,
      };
    });

    return quizArray;
  }

  // Parse dashboard data.
  getDashboardOptions = (data) => {

    const {
      generalOptions: {
        customStyle,
        removeAdminBar,
        showGithub,
        logo,
        copyright,
        facebook,
        twitter,
        linkedIn,
        instagram,
      },
      quizOptions: {
        scores,
      },
    } = data;

    const customStyleValue = (customStyle === '1') || false;
    const showGithubValue = (showGithub === '1') || false;
    const removeAdminBarValue = (removeAdminBar === '1') || false;
    const scoresArr = this.parseScoresData(scores);

    return {
      generalOptions: {
        customStyle: customStyleValue,
        showGithub: showGithubValue,
        removeAdminBar: removeAdminBarValue,
        copyright,
        facebook,
        twitter,
        linkedIn,
        instagram,
        logo: JSON.parse(logo),
      },
      quizOptions: {
        scores: scoresArr,
      },
    };
  }

  // fetch dashboard data from dashoard endpoint.
  fetchData = () => {

    const {
      root,
      dashboardApi,
    } = quizessDashboard;

    fetch(root + dashboardApi)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const data = this.getDashboardOptions(myJson);

        const {
          generalOptions: {
            customStyle,
            removeAdminBar,
            showGithub,
            copyright,
            facebook,
            twitter,
            linkedIn,
            instagram,
            logo,
          },
          quizOptions: {
            scores,
          },
        } = data;

        this.setState(() => {
          return {
            dataLoaded: true,
            scoresData: scores,
            useCustomStyle: customStyle,
            removeAdminBar,
            showGithub,
            copyright,
            facebook,
            twitter,
            linkedIn,
            instagram,
            logo,
          };
        });
      });
  }

    removeQuizScore = (quizId, playerIndex) => {
      const {scoresData} = this.state;

      const newScoresData = scoresData.map((quiz) => {
        if (quiz.value === quizId) {
          quiz.stats.splice(playerIndex, 1);
        }
        return quiz;
      });

      this.setState(() => {
        return {
          scoresData: newScoresData,
          showRemove: false,
          showDetails: false,
        };
      });

    }

    removeLastScore = (quizId, playerIndex) => {
      const {scoresData} = this.state;

      const newScoresData = scoresData.map((quiz) => {
        if (quiz.value === quizId) {
          quiz.stats[playerIndex].last = null;
        }
        return quiz;
      });

      this.setState(() => {
        return {
          scoresData: newScoresData,
          showRemove: false,
          showDetails: false,
        };
      });

    }

    removeScoreData = (playerId, quizId, playerIndex, last = true) => {

      const {
        root,
        scoresApi,
        dashboardNonce,
        nonce,
      } = quizessDashboard;

      const bodyData = JSON.stringify({
        playerId,
        quizId,
        last: (last) ? 1 : 0,
      });

      // Test to send data to registered quiz payer.
      fetch(`${root}${scoresApi}`, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, cors, *same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          Accept: 'application/json',
          'X-WP-Nonce': nonce,
          'dashboard-nonce': dashboardNonce,
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: bodyData,
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          const {
            messageElement,
            messageTextElement,
          } = this;

          generalHelpers.setMessageCallback(messageElement, messageTextElement, response, generalHelpers.IS_SUCCESS_CLASS);

          if (last) {
            this.removeLastScore(quizId, playerIndex);
          } else {
            this.removeQuizScore(quizId, playerIndex);
          }

        })
        .catch((error) => {
          const {
            messageElement,
            messageTextElement,
          } = this;

          generalHelpers.setMessageCallback(messageElement, messageTextElement, error, generalHelpers.IS_ERROR_CLASS);
        });

    }

    saveOptions = () => {
      const {
        root,
        optionsApi,
        dashboardNonce,
        nonce,
      } = quizessDashboard;

      const {
        useCustomStyle,
        removeAdminBar,
        showGithub,
        logo,
        copyright,
        facebook,
        twitter,
        linkedIn,
        instagram,
      } = this.state;

      const bodyData = JSON.stringify({
        customStyle: useCustomStyle,
        removeAdminBar,
        showGithub,
        copyright,
        logo,
        facebook,
        twitter,
        linkedIn,
        instagram,
      });

      // Test to send data to registered quiz payer.
      fetch(`${root}${optionsApi}`, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, cors, *same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          Accept: 'application/json',
          'X-WP-Nonce': nonce,
          'dashboard-nonce': dashboardNonce,
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: bodyData,
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          const {
            messageElement,
            messageTextElement,
          } = this;

          generalHelpers.setMessageCallback(messageElement, messageTextElement, response, generalHelpers.IS_SUCCESS_CLASS);

        })
        .catch((error) => {
          const {
            messageElement,
            messageTextElement,
          } = this;

          generalHelpers.setMessageCallback(messageElement, messageTextElement, error, generalHelpers.IS_ERROR_CLASS);
        });
    };


  // data Store
  dataStore = {
    handleOptionsMenu: (index, title) => {
      this.setState(() => {
        return {
          optionsPage: {
            id: index,
            title,
          },
          showDetails: false,
          showRemove: false,
        };
      });
    },
    handleScoresSelect: (quizScore) => {
      this.setState(() => {
        return {
          selectedQuiz: {
            value: quizScore.value,
            label: quizScore.label,
            data: quizScore.stats,
            index: quizScore.quizIndex,
          },
        };
      });
    },
    handleOnRemove: (playerId, quizId, index) => {
      this.removeScoreData(playerId, quizId, index, false);
    },
    handleOnRemoveLastScore: (playerId, quizId, index) => {
      this.removeScoreData(playerId, quizId, index, true);
    },
    handleOnShowRemove: () => {
      this.setState(() => {
        return {
          showRemove: true,
        };
      });
    },
    handleOnCancelRemove: () => {
      this.setState(() => {
        return {
          showRemove: false,
        };
      });
    },
    handleOnStatsPageChange: (pageNumber) => {
      this.setState(() => {
        return {
          statsPage: pageNumber,
        };
      });
    },
    handleOnAnswerPageChange: (pageNumber) => {
      this.setState(() => {
        return {
          answerStatsPage: pageNumber,
        };
      });
    },
    handleOnScorePageChange: (pageNumber) => {
      this.setState(() => {
        return {
          scorePage: pageNumber,
        };
      });
    },
    handleOnShowDetails: (playerId, playerIndex, quizId, lastScore) => {
      this.setState(() => {
        return {
          selectedPlayerDetails: {
            playerId,
            playerIndex,
            quizId,
            lastScoreStats: lastScore,
          },
          showDetails: true,
        };
      });
    },
    handleOnCloseDetails: () => {
      this.setState(() => {
        return {
          selectedPlayerDetails: {
            playerId: -1,
            playerIndex: -1,
            quizId: -1,
            lastScoreStats: {},
          },
          showDetails: false,
        };
      });
    },
    handleUseCustomChange: (value) => {
      this.setState(() => {
        return {
          useCustomStyle: value,
        };
      });
    },
    handleURemoveAdminBarChange: (value) => {
      this.setState(() => {
        return {
          removeAdminBar: value,
        };
      });
    },
    handleShowGithubChange: (value) => {
      this.setState(() => {
        return {
          showGithub: value,
        };
      });
    },
    handleOnSave: () => {
      this.saveOptions();
    },
    handleOnSelectMedia: (image) => {
      const url = (!image.sizes.thumbnail) ? image.url : image.sizes.thumbnail.url;
      this.setState(() => {
        return {
          logo: {
            id: image.id,
            url,
            title: image.title,
          },
        };
      });
    },
    handleOnRemoveMedia: () => {
      this.setState(() => {
        return {
          logo: {
            id: -1,
            url: '',
            title: '',
          },
        };
      });
    },
    handleCopyrightChange: (text) => {
      this.setState(() => {
        return {
          copyright: text,
        };
      });
    },
    handleFacebookChange: (text) => {
      this.setState(() => {
        return {
          facebook: text,
        };
      });
    },
    handleTwitterChange: (text) => {
      this.setState(() => {
        return {
          twitter: text,
        };
      });
    },
    handleLinkedInChange: (text) => {
      this.setState(() => {
        return {
          linkedIn: text,
        };
      });
    },
    handleInstagramChange: (text) => {
      this.setState(() => {
        return {
          instagram: text,
        };
      });
    },

  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      scoresData,
      dataLoaded,
      selectedQuiz,
      statsPage,
      answerStatsPage,
      scorePage,
      showDetails,
      showRemove,
      selectedPlayerDetails,
      optionsPage,
      useCustomStyle,
      showGithub,
      logo,
      copyright,
      facebook,
      twitter,
      linkedIn,
      instagram,
      removeAdminBar,
    } = this.state;

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <DashboardContext.Provider
        value={{
          values: {
            scoresData,
            dataLoaded,
            selectedQuiz,
            statsPage,
            answerStatsPage,
            scorePage,
            showDetails,
            showRemove,
            selectedPlayerDetails,
            optionsPage,
            useCustomStyle,
            logo,
            copyright,
            facebook,
            twitter,
            linkedIn,
            instagram,
            showGithub,
            removeAdminBar,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </DashboardContext.Provider>
    );
  }
}

export default DashboardProvider;
