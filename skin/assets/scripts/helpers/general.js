const general = {
  domReady(callback) {
    return document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
  },
  getBodyActiveClass(isIphone = false) {
    let activeClass = '';

    // For Iphone and iPad check and add different style
    if (isIphone) {
      activeClass = 'u-no-scroll-ios';
    } else {
      activeClass = 'u-no-scroll';
    }

    return activeClass;
  },
  parseQuizData(data) {
    const questions = [];
    const {
      blocks,
      bgOptions,
      options,
    } = data;
    blocks.forEach((el) => {
      let output;
      switch (el.name) {
        case 'category':
          output = this.getCategoryArrayData(el);
          if (output.length > 0) {
            questions.push(...output);
          }
          break;
        case 'question':
          output = this.getQuestionData(el);
          if (output) {
            questions.push(output);
          }
          break;
        default:
      }
    });

    return {
      options,
      bgOptions,
      questions,
    };
  },
  getCategoryArrayData(elements) {
    const {
      questions,
      style,
      category,
    } = elements;

    const output = questions.map((value, id) => {
      const {data} = value;
      data.title = category;
      return this.getQuestionData({data, style});
    });

    const filteredOutput = output.filter((val) => val !== false);

    return filteredOutput;
  },
  getQuestionData(element) {

    const questionText = element.data.question;
    const answersArray = element.data.answers;

    if (!questionText || !answersArray) {
      return false;
    }

    const question = {
      name: 'question',
      theme: element.style.theme,
      direction: element.style.direction,
      title: element.data.title,
      question: questionText,
      answers: answersArray,
      explanationText: element.data.explanationText,
      explanationType: element.data.explanationType,
      explanationMedia: element.data.explanationMedia,
    };

    return question;
  },
};

export default general;
