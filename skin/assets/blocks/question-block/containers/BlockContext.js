import React, {PureComponent} from 'react';

// Set Up The Initial Context
const BlockContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const BlockConsumer = BlockContext.Consumer;

class BlockProvider extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.answersArr = [];
  }

  attributesStore = {
    handleCorrectAnswer: (e) => {
      const pid = e.currentTarget.value;
      const newAnswer = this.answersArr.map((value, id) => {
        if (pid !== id.toString()) {
          return {...value, correct: false};
        }
        return {...value, correct: true};
      });

      this.props.dispatchAtributes({
        action: 'answers',
        payload: newAnswer,
      });
    },
    handleAnswerOnChange: (pid, newText) => {
      const newAnswer = this.answersArr.map((value, id) => {
        if (pid !== id) {
          return value;
        }

        return {
          ...value,
          text: newText,
        };
      });

      this.props.dispatchAtributes({
        action: 'answers',
        payload: newAnswer,
      });
    },
    handleRemoveAnswer: (pid) => () => {
      this.props.dispatchAtributes({
        action: 'answers',
        payload: this.answersArr.filter((value, id) => pid !== id),
      });
    },
    handleAddAnswer: () => {
      let correct = false;
      const newAnswersArr = this.answersArr.filter((value, id) => value.text !== '');
      newAnswersArr.forEach((answer) => {
        if (answer.correct) {
          correct = true;
        }
      });
      this.props.dispatchAtributes({
        action: 'answers',
        payload: newAnswersArr.concat([{
          text: '',
          correct: (correct === false) || false,
        }]),
      });
    },
    handleTitleChange: (title) => {
      this.props.dispatchAtributes({
        action: 'title',
        payload: title,
      });
    },
    handleQuestionChange: (question) => {
      this.props.dispatchAtributes({
        action: 'question',
        payload: question,
      });
    },
    handleRowsChange: (rows) => {
      this.props.dispatchAtributes({
        action: 'rows',
        payload: JSON.stringify(rows),
      });
    },
    handleThemeChange: (theme) => {
      this.props.dispatchAtributes({
        action: 'theme',
        payload: JSON.stringify(theme),
      });
    },
    handleExplanationTypeChange: (explanationType) => {
      this.props.dispatchAtributes({
        action: 'explanationType',
        payload: JSON.stringify(explanationType),
      });
    },
    handleOnBackgroundChange: (color) => {
      this.props.dispatchAtributes({
        action: 'backgroundColor',
        payload: color,
      });
    },
    handleOnFontColorChange: (color) => {
      this.props.dispatchAtributes({
        action: 'fontColor',
        payload: color,
      });
    },
    handleExplanationChecked: (checked) => {
      this.props.dispatchAtributes({
        action: 'showExplanation',
        payload: checked,
      });
    },
    handleExplanationChange: (explanation) => {
      this.props.dispatchAtributes({
        action: 'explanation',
        payload: explanation,
      });
    },
    handleOnSelectImage: (image) => {
      this.props.dispatchAtributes({
        action: 'media',
        payload: {
          id: image.id,
          url: image.url,
          alt: image.title,
        },
      });
    },
    handleOnSelectVideo: (video) => {
      this.props.dispatchAtributes({
        action: 'media',
        payload: {
          url: video.url,
          id: video.id,
          alt: video.title,
        },
      });
    },
    handleOnSelectLottie: (lottie) => {
      this.props.dispatchAtributes({
        action: 'media',
        payload: {
          url: lottie.url,
          id: lottie.id,
          alt: lottie.title,
        },
      });
    },
    handleYoutubeChange: (value) => {
      this.props.dispatchAtributes({
        action: 'youtube',
        payload: value,
      });
    },
    handleEmbed: (value) => {
      this.props.dispatchAtributes({
        action: 'embed',
        payload: value,
      });
    },
  };

  render() {
    const {
      attributes: {
        answers,
      },
      attributes,
      clientId,
      className,
    } = this.props;

    this.answersArr = (answers) ? JSON.parse(answers) : [];

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <BlockContext.Provider
        value={{
          values: {
            attributes,
            clientId,
            className,
            answers: this.answersArr,
          },
          attributesStore: this.attributesStore,
        }}>
        {this.props.children}
      </BlockContext.Provider>
    );
  }
}

export default BlockProvider;


