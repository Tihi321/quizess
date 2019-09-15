import React, {useState, useEffect, useMemo} from 'react';
import {
  setMessageCallback,
  IS_SUCCESS_CLASS,
  IS_ERROR_CLASS,
} from '../../../utils/modifiers';
import {
  getDashboardData,
  patchScoresData,
  savaOptionsData,
} from '../../../services/dashboard';

// Set Up The Initial Context
const DashboardContext = React.createContext();

function getDomElement(selector) {
  return document.querySelector(selector);
}

const DashboardProvider = (props) => {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [scoresData, setScoresData] = useState([]);
  const [optionsPage, setOptionsPage] = useState({
    id: 0,
    title: 'Settings',
  });
  const [selectedQuiz, setSelectedQuiz] = useState({
    value: 0,
    label: '',
    data: [],
    index: -1,
  });
  const [selectedPlayerDetails, setSelectedPlayerDetails] = useState({
    playerId: -1,
    playerIndex: -1,
    quizId: -1,
    lastScoreStats: {},
  });
  const [logo, setLogo] = useState({
    id: -1,
    url: '',
    title: '',
  });
  const [copyright, setCopyright] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [removeAdminBar, setRemoveAdminBar] = useState(false);
  const [useCustomStyle, setUseCustomStyle] = useState(false);
  const [showGithub, setShowGithub] = useState(false);
  const [statsPage, setStatsPage] = useState(0);
  const [answerStatsPage, setAnswerStatsPage] = useState(0);
  const [scorePage, setScorePage] = useState(0);

  // Elements for the submit message. Outside of react, out in the light DOM.
  const messageElement = useMemo(() => getDomElement(props.messageElementSelector), [props.messageElementSelector]);

  const messageTextElement = useMemo(() => getDomElement(props.messageTextSelector), [props.messageElementSelector]);

  // Parse scores data for quizess page in dashboard. Returns array appended with players id.
  const parseScoresData = (data) => {

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
  };

  // Parse dashboard data.
  const getDashboardOptions = (data) => {

    const {
      generalOptions: {
        customStyle,
      },
      generalOptions,
      quizOptions: {
        scores,
      },
    } = data;

    const customStyleValue = (customStyle === '1') || false;
    const showGithubValue = (generalOptions.showGithub === '1') || false;
    const lightThemeValue = (generalOptions.lightTheme === '1') || false;
    const removeAdminBarValue = (generalOptions.removeAdminBar === '1') || false;
    const scoresArr = parseScoresData(scores);

    return {
      generalOptions: {
        customStyle: customStyleValue,
        showGithub: showGithubValue,
        lightTheme: lightThemeValue,
        removeAdminBar: removeAdminBarValue,
        copyright: generalOptions.copyright,
        facebook: generalOptions.facebook,
        twitter: generalOptions.twitter,
        linkedIn: generalOptions.linkedIn,
        instagram: generalOptions.instagram,
        logo: JSON.parse(generalOptions.logo),
      },
      quizOptions: {
        scores: scoresArr,
      },
    };
  };

  // fetch dashboard data from dashoard endpoint.
  const fetchData = () => {

    getDashboardData()
      .then((myJson) => {
        const data = getDashboardOptions(myJson);

        const {
          generalOptions: {
            customStyle,
          },
          generalOptions,
          quizOptions: {
            scores,
          },
        } = data;

        setScoresData(() => scores);
        setUseCustomStyle(() => customStyle);
        setRemoveAdminBar(() => generalOptions.removeAdminBar);
        setLightTheme(() => generalOptions.lightTheme);
        setCopyright(() => generalOptions.copyright);
        setShowGithub(() => generalOptions.showGithub);
        setFacebook(() => generalOptions.facebook);
        setTwitter(() => generalOptions.twitter);
        setLinkedIn(() => generalOptions.linkedIn);
        setInstagram(() => generalOptions.instagram);
        setLogo(() => generalOptions.logo);
        setDataLoaded(() => true);
      });
  };

  const removeQuizScore = (quizId, playerIndex) => {

    const newScoresData = scoresData.map((quiz) => {
      if (quiz.value === quizId) {
        quiz.stats.splice(playerIndex, 1);
      }
      return quiz;
    });

    setScoresData(() => newScoresData);
    setShowRemove(() => false);
    setShowDetails(() => false);


  };

  const removeLastScore = (quizId, playerIndex) => {

    const newScoresData = scoresData.map((quiz) => {
      if (quiz.value === quizId) {
        quiz.stats[playerIndex].last = null;
      }
      return quiz;
    });

    setScoresData(() => newScoresData);
    setShowRemove(() => false);
    setShowDetails(() => false);

  };

  const removeScoreData = (playerId, quizId, playerIndex, last = true) => {

    const bodyData = {
      playerId,
      quizId,
      last: (last) ? 1 : 0,
    };

    patchScoresData(bodyData)
      .then((response) => {

        setMessageCallback(messageElement, messageTextElement, response, IS_SUCCESS_CLASS);

        if (last) {
          removeLastScore(quizId, playerIndex);
        } else {
          removeQuizScore(quizId, playerIndex);
        }

      })
      .catch((error) => {

        setMessageCallback(messageElement, messageTextElement, error, IS_ERROR_CLASS);
      });

  };

  const saveOptions = () => {

    const bodyData = {
      customStyle: useCustomStyle,
      lightTheme,
      removeAdminBar,
      showGithub,
      copyright,
      logo,
      facebook,
      twitter,
      linkedIn,
      instagram,
    };


    savaOptionsData(bodyData)
      .then((response) => {

        setMessageCallback(messageElement, messageTextElement, response, IS_SUCCESS_CLASS);

      })
      .catch((error) => {

        setMessageCallback(messageElement, messageTextElement, error, IS_ERROR_CLASS);
      });
  };


  // data Store
  const dataStore = {
    handleOptionsMenu: (index, title) => {

      setOptionsPage(() => {
        return {
          id: index,
          title,
        };
      });
      setShowRemove(() => false);
      setShowDetails(() => false);

    },
    handleScoresSelect: (quizScore) => {
      setSelectedQuiz(() => {
        return {
          value: quizScore.value,
          label: quizScore.label,
          data: quizScore.stats,
          index: quizScore.quizIndex,
        };
      });
    },
    handleOnRemove: (playerId, quizId, index) => {
      removeScoreData(playerId, quizId, index, false);
    },
    handleOnRemoveLastScore: (playerId, quizId, index) => {
      removeScoreData(playerId, quizId, index, true);
    },
    handleOnShowRemove: () => {
      setShowRemove(() => true);
    },
    handleOnCancelRemove: () => {
      setShowRemove(() => false);
    },
    handleOnStatsPageChange: (pageNumber) => {
      setStatsPage(() => pageNumber);
    },
    handleOnAnswerPageChange: (pageNumber) => {
      setAnswerStatsPage(() => pageNumber);
    },
    handleOnScorePageChange: (pageNumber) => {
      setScorePage(() => pageNumber);
    },
    handleOnShowDetails: (playerId, playerIndex, quizId, lastScore) => {
      setSelectedPlayerDetails(() => {
        return {
          playerId,
          playerIndex,
          quizId,
          lastScoreStats: lastScore,
        };
      });
      setShowDetails(() => true);
    },
    handleOnCloseDetails: () => {
      setSelectedPlayerDetails(() => {
        return {
          playerId: -1,
          playerIndex: -1,
          quizId: -1,
          lastScoreStats: {},
        };
      });
      setShowDetails(() => false);
    },
    handleUseCustomChange: (value) => {
      setUseCustomStyle(() => value);
    },
    handleLightThemeChange: (value) => {
      setLightTheme(() => value);
    },
    handleURemoveAdminBarChange: (value) => {
      setRemoveAdminBar(() => value);
    },
    handleShowGithubChange: (value) => {
      setShowGithub(() => value);
    },
    handleOnSave: () => {
      saveOptions();
    },
    handleOnSelectMedia: (image) => {
      setLogo(() => {
        return {
          id: image.id,
          url: image.url,
          title: image.title,
        };
      });
    },
    handleOnRemoveMedia: () => {
      setLogo(() => {
        return {
          id: -1,
          url: '',
          title: '',
        };
      });
    },
    handleCopyrightChange: (text) => {
      setCopyright(() => text);
    },
    handleFacebookChange: (text) => {
      setFacebook(() => text);
    },
    handleTwitterChange: (text) => {
      setTwitter(() => text);
    },
    handleLinkedInChange: (text) => {
      setLinkedIn(() => text);
    },
    handleInstagramChange: (text) => {
      setInstagram(() => text);
    },

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
          lightTheme,
        },
        dataStore,
      }}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export {DashboardContext, DashboardProvider};
