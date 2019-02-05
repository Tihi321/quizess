const QuizApp = (props) => {
  const {
    api,
  } = props;

  const fetchApi = () => {
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  };

  return (
    <button
      onClick={fetchApi}
      className="quiz__button--btn">
      Start
    </button>
  );
};

export default QuizApp;
