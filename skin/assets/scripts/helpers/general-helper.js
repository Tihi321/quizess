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

}

const generalHelper = new GeneralHelper();
Object.freeze(generalHelper);

export default generalHelper;
