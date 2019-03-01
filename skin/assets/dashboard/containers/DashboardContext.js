/* global quizessDashboard */
import React, {PureComponent} from 'react';

// Set Up The Initial Context
const DashboardContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const DashboardConsumer = DashboardContext.Consumer;

class DashboardProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
      scoresData: [],
      selectedQuiz: {
        id: 0,
        data: [],
        index: -1,
      },
      statsPage: 0,
    };
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

  fetchScores = () => {

    const {
      root,
      scoresApi,
    } = quizessDashboard;

    fetch(root + scoresApi)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const data = this.parseScoresData(myJson);
        this.setState(() => {
          return {
            dataLoaded: true,
            scoresData: data,
          };
        });
      });
  }

    removeQuizScore = (quizId, playerIndex) => {
      const {scoresData} = this.state;

      const newSelectedQuiz = {};

      const newScoresData = scoresData.map((quiz) => {
        if (quiz.value === quizId) {
          quiz.stats.splice(playerIndex, 1);
          newSelectedQuiz.data = quiz.stats;
          newSelectedQuiz.id = quiz.value;
        }
        return quiz;
      });

      this.setState(() => {
        return {
          selectedQuiz: newSelectedQuiz,
          scoresData: newScoresData,
        };
      });

    }

    removeScoreData = (playerId, quizId, playerIndex) => {

      const {
        root,
        scoresApi,
        dashboardNonce,
        nonce,
      } = quizessDashboard;

      const bodyData = JSON.stringify({
        playerId,
        quizId,
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
          this.removeQuizScore(quizId, playerIndex);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    }

  dataStore = {
    handleScoresSelect: (quizScore) => {
      this.setState(() => {
        return {
          selectedQuiz: {
            id: quizScore.value,
            data: quizScore.stats,
            index: quizScore.quizIndex,
          },
        };
      });
    },
    handleOnRemove: (playerId, quizId, index) => {
      this.removeScoreData(playerId, quizId, index);
    },
    handleOnStatsPageChange: (pageNumber) => {
      this.setState(() => {
        return {
          statsPage: pageNumber,
        };
      });
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
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </DashboardContext.Provider>
    );
  }
}

export default DashboardProvider;
