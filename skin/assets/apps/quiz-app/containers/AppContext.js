/* global userLogged */
import React, {useState, useEffect, useMemo} from 'react';
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

const AppProvider = (props) => {

  const {
    theme,
    userSubmit,
    headerElement,
  } = props;

  const {
    userPlayer,
    singleSubmit: submit,
  } = userLogged;

  const $body = useMemo(getBody, []);
  const isIphone = useMemo(isIPhone, []);

  const singleSubmit = useMemo(() => (submit === '1') || false, []);
  const shouldSubmit = useMemo(() => (userSubmit === '1' && userPlayer === 'yes') || false, []);

  const [quizLoaded, setQuizLoaded] = useState(false);
  const [shoudNotPlay, setShoudNotPlay] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [submitedAnswer, setSubmitedAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [questionStats, setQuestionStats] = useState([]);
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({
    id: 0,
    correct: false,
  });
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [playTimer, setPlayTimer] = useState(false);
  const [scoresSubmited, setScoresSubmited] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [message, setMessage] = useState(false);

  // sends quiz record of player score to endpoint, even if quiz is canceled it ads negative answers to skipped questions.
  const sendQuizData = (canceled = false) => {

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
      id: props.quizId,
      stats: questionStats,
      total: questionsTotal,
      correct: correctAnswers,
    };

    saveScoresData(bodyData)
      .then((response) => {

        setMessage(() => response);
        setSuccessMessage(() => true);
        setShowMessage(() => true);
        setScoresSubmited(() => true);

      })
      .catch((error) => {
        setMessage(() => error);
        setShowMessage(() => true);
        setSuccessMessage(() => false);
      });

  };

  /**
   * If user refreshes page after starting the quiz
   * sends quiz scores if player should send scores
   * avoids reseting quiz befeore end.
   */
  const onUnload = (e) => {

    if (quizLoaded) {

      if (shouldSubmit && !scoresSubmited) {
        sendQuizData(true);
      }
    }

  };

  /**
   * sets class to body ( eg. to remove scrollbar ) when modal is shown.
   * and adds lower z index to menu ( headerElement )
   */
  const setBody = () => {
    headerElement.classList.add('is-hidden');
    setTimeout(() => {
      $body.classList.add(getBodyActiveClass(isIphone));
    }, 300);
  };

  const unSetBody = () => {
    setTimeout(() => {
      $body.classList.remove(getBodyActiveClass(isIphone));
      headerElement.classList.remove('is-hidden');
    }, 300);
  };

  // gets data for quiz with param of quiz id.
  const fetchApi = () => {

    setInProgress(() => true);

    getQuizessData(props.quizId)
      .then((myJson) => {
        const quizData = parseQuizData(myJson);

        setQuestionsTotal(() => quizData.questions.length);
        setData(() => quizData);
        setShoudNotPlay(() => (myJson.shouldPlay === '2'));
        setModal(() => true);
        setInProgress(() => false);
      });
  };

  // reset state before next question starts.
  const resetNextQuestion = () => {

    setCurrentQuestion(() => currentQuestion + 1);
    setShowExplanation(() => false);
    setSubmitedAnswer(() => false);
    setStopTimer(() => false);
    setPlayTimer(() => false);
    setSelectedAnswer(() => {
      return {
        id: 0,
        correct: false,
      };
    });

  };

  // reset state of the quiz for try again button.
  const resetQuiz = (exit) => {

    if (exit) {
      setModal(() => false);
      setShowExit(() => false);
      unSetBody();
    }

    setSubmitedAnswer(() => false);
    setShowExplanation(() => false);
    setQuestionStats(() => []);
    setCurrentQuestion(() => 0);
    setCorrectAnswers(() => 0);
    setStopTimer(() => false);
    setPlayTimer(() => false);
    setSelectedAnswer(() => {
      return {
        id: 0,
        correct: false,
      };
    });
  };

  const submitAnswer = (onStop) => {

    if (onStop) {
      setSelectedAnswer(() => {
        return (selectedAnswer.id !== 0) ? selectedAnswer : {
          id: -1,
          correct: false,
        };
      });
    }

    setSubmitedAnswer(() => true);
    setShowExplanation(() => false);
    setQuestionStats(() => questionStats.concat(selectedAnswer));
    setCorrectAnswers(() => {
      return (selectedAnswer.correct) ? correctAnswers + 1 : correctAnswers;
    });
    setStopTimer(() => true);
    setPlayTimer(() => true);

  };

  const dataStore = {
    handleStart: () => {

      // Check if state data is loaded & skip fetch if needed.
      if (Object.entries(data).length === 0 && data.constructor === Object) {
        fetchApi();
        setBody();
        setQuizLoaded(() => true);
      } else {
        setModal(() => true);
        setBody();
      }
    },
    handleClose: () => {

      if (shouldSubmit && !scoresSubmited) {
        sendQuizData(true);
      }
      resetQuiz(true);
    },
    handleCancelClose: () => {
      setShowExit(() => false);
    },
    handleShowExit: () => {
      setShowExit(() => true);
    },
    handleOnStop: () => {

      if (!submitedAnswer) {
        submitAnswer(true);
      }
    },
    handleAnswerChange: (number, correct) => {
      setSelectedAnswer(() => {
        return {
          id: number,
          correct,
        };
      });
    },
    handleSubmitChange: () => {

      if (!submitedAnswer) {
        submitAnswer();
        return;
      }

      resetNextQuestion();
    },
    handleExplanationChange: () => {
      setShowExplanation(() => !showExplanation);
    },
    handleTryAgain: () => {
      resetQuiz();
    },
    handleSubmitScore: () => {
      if (shouldSubmit) {
        sendQuizData();
      }
    },
    handleResetMessage: () => {
      setShowMessage(() => false);
    },
  };


  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

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
        dataStore,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppProvider, AppContext};


