/* global userLogged */
import React, {PureComponent} from 'react';
import {isIPhone} from '../../../utils/devices';
import {parseQuizData} from '../../../utils/quiz-data';
import {
  getBody,
  getBodyActiveClass,
} from '../../../utils/selectors';
import {
  saveScoresData,
  getQuizessData,
} from '../../../services/quizess';

// Set Up The Initial Context
const AppContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;

class AppProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.$body = getBody();
    this.isIphone = isIPhone();

    this.headerElement = props.headerElement;

    const {
      theme,
      userSubmit,
    } = props;
    const {
      userPlayer,
      singleSubmit,
    } = userLogged;

    this.state = {
      shouldSubmit: (userSubmit === '1' && userPlayer === 'yes') || false,
      singleSubmit: (singleSubmit === '1') || false,
      quizLoaded: false,
      shoudNotPlay: true,
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

  /**
   * If user refreshes page after starting the quiz
   * sends quiz scores if player should send scores
   * avoids reseting quiz befeore end.
   */
  onUnload = (e) => {
    const {
      quizLoaded,
      shouldSubmit,
      scoresSubmited,
    } = this.state;

    if (quizLoaded) {

      if (shouldSubmit && !scoresSubmited) {
        this.sendQuizData(true);
      }
    }

  }

  /**
   * sets class to body ( eg. to remove scrollbar ) when modal is shown.
   * and adds lower z index to menu ( headerElement )
   */
  setBody = () => {
    this.headerElement.classList.add('is-hidden');
    if (this.isIphone) {
      this.scrollPosition = window.pageYOffset;
    }
    setTimeout(() => {
      this.$body.classList.add(getBodyActiveClass(this.isIphone));
    }, 300);
  }

  unSetBody = () => {
    if (this.isIphone) {
      this.scrollPosition = window.pageYOffset;
    }
    setTimeout(() => {
      this.$body.classList.remove(getBodyActiveClass(this.isIphone));
      this.headerElement.classList.remove('is-hidden');
    }, 300);
  }

  // sends quiz record of player score to endpoint, even if quiz is canceled it ads negative answers to skipped questions.
  sendQuizData = (canceled = false) => {
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

    const bodyData = {
      id: quizId,
      stats: questionStats,
      total: questionsTotal,
      correct: correctAnswers,
    };

    saveScoresData(bodyData)
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

  // gets data for quiz with param of quiz id.
  fetchApi = () => {
    const {quizId} = this.props;

    this.setState(() => {
      return {
        inProgress: true,
      };
    });

    getQuizessData(quizId)
      .then((myJson) => {
        const data = parseQuizData(myJson);
        const {questions} = data;
        this.setState(() => {
          return {
            questionsTotal: questions.length,
            inProgress: false,
            data,
            modal: true,
            shoudNotPlay: (myJson.shouldPlay === '2'),
          };
        });
      });
  }

  // reset state before next question starts.
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

  // reset state of the quiz for try again button.
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
        this.setState(() => {
          return {
            quizLoaded: true,
          };
        });
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
      const {
        shouldSubmit,
        scoresSubmited,
      } = this.state;

      if (shouldSubmit && !scoresSubmited) {
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
      const {shouldSubmit} = this.state;

      if (shouldSubmit) {
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



  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }


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
      shouldSubmit,
      singleSubmit,
      shoudNotPlay,
    } = this.state;

    return (

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
            shouldSubmit,
            singleSubmit,
            shoudNotPlay,
          },
          dataStore: this.dataStore,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;


