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
    const {blocks} = data;
    blocks.forEach((el) => {
      switch (el.name) {
        case 'category':
          questions.push(...this.getCategoryArrayData(el));
          break;
        case 'question':
          questions.push(...this.getQuestionData(el));
          break;
        default:
      }
    });

    return data;
  },
  getCategoryArrayData(elements) {
    const {questions} = elements;
    console.log(questions);
    return [3, 4, 5];
  },
  getQuestionData(element) {

    console.log(element);
    const question = {
      name: 'question',
      theme: element.style.theme,
      direction: element.style.direction,
      title: element.data.title,
      question: element.data.question,
      answers: element.data.answers,
    };
    const explanation = (element.data.explanationText) ? {
      name: 'explanation',
      theme: element.style.theme,
      text: element.data.explanationText,
      mediaType: element.data.explanationType,
      media: element.data.explanationMedia,
    } : false;

    if (!explanation) {
      return [question];
    }

    return [question, explanation];
  },
};

export default general;
