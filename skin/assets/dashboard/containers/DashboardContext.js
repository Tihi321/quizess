/* global quizessDashboard */
import React, {PureComponent} from 'react';

// Set Up The Initial Context
const DashboardContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const DashboardConsumer = DashboardContext.Consumer;

class DashboardProvider extends PureComponent {
  constructor(props) {
    super(props);

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
      showDetails: false,
      showRemove: false,
      useCustomStyle: false,
      statsPage: 0,
      answerStatsPage: 0,
      scorePage: 0,
    };

    this.IS_SHOWN_CLASS = 'is-shown';
    this.IS_SUCCESS_CLASS = 'is-success';
    this.IS_ERROR_CLASS = 'is-error';
  }

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

  getDashboardOptions = (data) => {

    const {
      generalOptions: {
        customStyle,
      },
      quizOptions: {
        scores,
      },
    } = data;

    const customStyleValue = (customStyle === '1') || false;
    const scoresArr = this.parseScoresData(scores);

    return {
      generalOptions: {
        customstyles: customStyleValue,
      },
      quizOptions: {
        scores: scoresArr,
      },
    };
  }

  fetchScores = () => {

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
            customstyles,
          },
          quizOptions: {
            scores,
          },
        } = data;

        this.setState(() => {
          return {
            dataLoaded: true,
            scoresData: scores,
            useCustomStyle: customstyles,
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

    setMessageCallback = (message, elementClass) => {
      const {
        messageElement,
        messageTextElement,
        IS_SHOWN_CLASS,
        IS_SUCCESS_CLASS,
        IS_ERROR_CLASS,
      } = this;

      messageTextElement.innerHTML = message;

      messageElement.classList.remove(IS_SUCCESS_CLASS);
      messageElement.classList.remove(IS_ERROR_CLASS);

      messageElement.classList.add(elementClass);
      messageElement.classList.add(IS_SHOWN_CLASS);

      setTimeout(this.removeElementCallback, 5000);

    }

    removeElementCallback = () => {
      const {
        messageElement,
        IS_SHOWN_CLASS,
      } = this;

      messageElement.classList.remove(IS_SHOWN_CLASS);
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
          const {IS_SUCCESS_CLASS} = this;

          this.setMessageCallback(response, IS_SUCCESS_CLASS);

          if (last) {
            this.removeLastScore(quizId, playerIndex);
          } else {
            this.removeQuizScore(quizId, playerIndex);
          }

        })
        .catch((error) => {
          const {IS_ERROR_CLASS} = this;

          this.setMessageCallback(error, IS_ERROR_CLASS);
        });

    }

    saveOptions = () => {
      const {
        root,
        optionsApi,
        dashboardNonce,
        nonce,
      } = quizessDashboard;

      const {useCustomStyle} = this.state;

      const bodyData = JSON.stringify({
        customStyle: useCustomStyle,
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
          const {IS_SUCCESS_CLASS} = this;

          console.log(response);

          this.setMessageCallback(response, IS_SUCCESS_CLASS);

        })
        .catch((error) => {
          const {IS_ERROR_CLASS} = this;

          this.setMessageCallback(error, IS_ERROR_CLASS);
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
    handleOnSave: () => {
      this.saveOptions();
    },

  };

  componentDidMount() {
    this.fetchScores();
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
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </DashboardContext.Provider>
    );
  }
}

export default DashboardProvider;
