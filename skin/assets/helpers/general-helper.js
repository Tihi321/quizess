class GeneralHelper {
  constructor() {

    this.IS_SHOWN_CLASS = 'is-shown';
    this.IS_SUCCESS_CLASS = 'is-success';
    this.IS_ERROR_CLASS = 'is-error';
  }

  setMessageCallback = (messageElement, messageTextElement, message, elementClass) => {
    const {
      IS_SHOWN_CLASS,
      IS_SUCCESS_CLASS,
      IS_ERROR_CLASS,
    } = this;

    messageTextElement.innerHTML = message;

    messageElement.classList.remove(IS_SUCCESS_CLASS);
    messageElement.classList.remove(IS_ERROR_CLASS);

    messageElement.classList.add(elementClass);
    messageElement.classList.add(IS_SHOWN_CLASS);

    setTimeout(() => this.removeElementCallback(messageElement), 5000);

  }

  removeElementCallback = (messageElement) => {
    const {
      IS_SHOWN_CLASS,
    } = this;

    messageElement.classList.remove(IS_SHOWN_CLASS);
  }

  domReady = (callback) => {
    return document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
  }

  getBodyActiveClass = (isIphone = false) => {
    let activeClass = '';

    // For Iphone and iPad check and add different style
    if (isIphone) {
      activeClass = 'u-no-scroll-ios';
    } else {
      activeClass = 'u-no-scroll';
    }

    return activeClass;
  }

  getPercentage = (value, outOff) => {
    return Math.floor((value * 100) / outOff);
  }

  isValidURL = (str) => {
    return (/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/).test(str);
  }

  classList = (elt) => {
    return {
      toggle(c) {
        elt.classList.toggle(c); return this;
      },
      add(c) {
        elt.classList.add(c); return this;
      },
      remove(c) {
        elt.classList.remove(c); return this;
      },
    };

  }

}

const generalHelper = new GeneralHelper();
Object.freeze(generalHelper);

export default generalHelper;
