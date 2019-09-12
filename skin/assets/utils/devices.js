export function isIPhone() {
  let checkIphone = false;

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    checkIphone = true;
  }

  return checkIphone;
}

export function isAndroid() {
  let checkIphone = false;

  if (navigator.userAgent.match(/Android/i)) {
    checkIphone = true;
  }

  return checkIphone;
}
