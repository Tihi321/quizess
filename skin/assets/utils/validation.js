export function isValidURL(str) {
  return (/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/).test(str);
}
