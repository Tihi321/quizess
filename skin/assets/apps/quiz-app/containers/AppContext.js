/* global quizessOptions, userLogged */
import React, {PureComponent} from 'react';
import devices from '../../../helpers/devices';
import generalHelper from '../../../helpers/general-helper';
import quizHelper from '../../../helpers/quiz-helper';
import selectors from '../../../helpers/selectors';

// Set Up The Initial Context
const AppContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;

class AppProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.$body = selectors.getBody();
    this.isIphone = devices.iPhone();

    this.headerElement = props.headerElement;

    const {theme, userSubmit} = props;
    const {userPlayer} = userLogged;

    this.state = {
      userSubmit: (userSubmit === '1') || false,
      userPlayer: (userPlayer === 'yes') || false,
      theme,
      inProgress: false,
      data: {},
      modal: false,
      submitedAnswer: false,
      showExplanation: false,
      showExit: false,
      questionStats: [],
      questionsTotal: 0,
      currentQuestion: 0,
      selectedAnswer: {
        id: 0,
        correct: false,
      },
      correctAnswers: 0,
      stopTimer: false,
      playTimer: false,
      scoresSubmited: false,
      showMessage: false,
      successMessage: false,
      message: '',
    };
  }

  setBody = () => {
    this.headerElement.classList.add('is-hidden');
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
      this.headerElement.classList.remove('is-hidden');
    }, 300);
  }

  sendQuizData = (canceled = false) => {

    const {root} = quizessOptions;
    const {nonce, scoresApi} = userLogged;
    const {questionStats, questionsTotal, correctAnswers} = this.state;
    const {quizId} = this.props;

    if (canceled) {
      for (let index = 0; index < questionsTotal; index++) {
        if (!questionStats[index]) {
          questionStats[index] = {
            id: -1,
            correct: false,
          };
        }

      }
    }

    const bodyData = JSON.stringify({
      id: quizId,
      stats: questionStats,
      total: questionsTotal,
      correct: correctAnswers,
    });

    // Test to send data to registered quiz payer.
    fetch(`${root}${scoresApi}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, cors, *same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Accept: 'application/json',
        'X-WP-Nonce': nonce,
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: bodyData,
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {

        this.setState(() => {
          return {
            message: response,
            successMessage: true,
            showMessage: true,
            scoresSubmited: true,
          };
        });

      })
      .catch((error) => {
        this.setState(() => {
          return {
            message: error,
            showMessage: true,
            successMessage: false,
          };
        });
      });

  }

  fetchApi = () => {
    const {root} = quizessOptions;
    const {quizApi} = quizessOptions;
    const {quizId} = this.props;
    this.setState(() => {
      return {
        inProgress: true,
      };
    });
    fetch(root + quizApi + quizId)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const data = quizHelper.parseQuizData(myJson);
        const {questions} = data;
        this.setState(() => {
          return {
            questionsTotal: questions.length,
            inProgress: false,
            data,
            modal: true,
          };
        });
      });
  }

  resetNextQuestion = () => {

    const {
      currentQuestion,
    } = this.state;
    this.setState(() => {
      return {
        currentQuestion: currentQuestion + 1,
        showExplanation: false,
        submitedAnswer: false,
        stopTimer: false,
        playTimer: false,
        selectedAnswer: {
          id: 0,
          correct: false,
        },
      };
    });

  }

  resetQuiz = (exit) => {

    const output = {
      submitedAnswer: false,
      showExplanation: false,
      questionStats: [],
      currentQuestion: 0,
      selectedAnswer: {
        id: 0,
        correct: false,
      },
      correctAnswers: 0,
      stopTimer: false,
      playTimer: false,
      scoresSubmited: false,
    };

    if (exit) {
      output.modal = false;
      output.showExit = false;
      this.unSetBody();
    }

    this.setState(() => {
      return output;
    });
  }

  submitAnswer = (onStop) => {
    const {
      selectedAnswer: {
        id,
        correct,
      },
      selectedAnswer,
      correctAnswers,
      questionStats,
    } = this.state;

    const newState = {
      submitedAnswer: true,
      playTimer: true,
      stopTimer: true,
      correctAnswers: (correct) ? correctAnswers + 1 : correctAnswers,
      questionStats: questionStats.concat(selectedAnswer),
    };

    if (onStop) {
      newState.selectedAnswer = (id !== 0) ? selectedAnswer : {
        id: -1,
        correct: false,
      };
    }

    this.setState(() => {
      return newState;
    });
  }

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
      const {userPlayer, userSubmit} = this.state;

      if (userPlayer && userSubmit) {
        this.sendQuizData(true);
      }
      this.resetQuiz(true);
    },
    handleCancelClose: () => {
      this.setState(() => {
        return {
          showExit: false,
        };
      });
    },
    handleShowExit: () => {
      this.setState(() => {
        return {
          showExit: true,
        };
      });
    },
    handleOnStop: () => {

      const {submitedAnswer} = this.state;
      if (!submitedAnswer) {
        this.submitAnswer(true);
      }
    },
    handleAnswerChange: (number, correct) => {
      this.setState(() => {
        return {
          selectedAnswer: {
            id: number,
            correct,
          },
        };
      });
    },
    handleSubmitChange: () => {

      const {submitedAnswer} = this.state;
      if (!submitedAnswer) {
        this.submitAnswer();
        return;
      }

      this.resetNextQuestion();
    },
    handleExplanationChange: () => {
      const {showExplanation} = this.state;
      this.setState(() => {
        return {
          showExplanation: !showExplanation,
        };
      });
    },
    handleTryAgain: () => {
      this.resetQuiz();
    },
    handleSubmitScore: () => {
      const {userPlayer, userSubmit} = this.state;

      if (userPlayer && userSubmit) {
        this.sendQuizData();
      }
    },
    handleResetMessage: () => {
      this.setState(() => {
        return {
          showMessage: false,
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
      correctAnswers,
      questionStats,
      currentQuestion,
      questionsTotal,
      selectedAnswer,
      showExplanation,
      submitedAnswer,
      stopTimer,
      playTimer,
      showExit,
      scoresSubmited,
      showMessage,
      message,
      successMessage,
    } = this.state;

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <AppContext.Provider
        value={{
          values: {
            inProgress,
            data,
            modal,
            theme,
            correctAnswers,
            questionStats,
            currentQuestion,
            questionsTotal,
            selectedAnswer,
            showExplanation,
            submitedAnswer,
            stopTimer,
            playTimer,
            showExit,
            scoresSubmited,
            showMessage,
            message,
            successMessage,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;


