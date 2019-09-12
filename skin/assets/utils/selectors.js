export function getBody() {
  return document.querySelector('html, body');
}

export function getBodyActiveClass(isIphone = false) {
  let activeClass = '';

  // For Iphone and iPad check and add different style
  if (isIphone) {
    activeClass = 'u-no-scroll-ios';
  } else {
    activeClass = 'u-no-scroll';
  }

  return activeClass;
}
