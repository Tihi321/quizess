class GeneralHelper {

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
    return (value * 100) / outOff;
  }

  isValidURL = (str) => {
    return (/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/).test(str);
  }

}

const generalHelper = new GeneralHelper();
Object.freeze(generalHelper);

export default generalHelper;
