function getType(input) {
  if (input !== input) {
    return 'NaN';
  } else if (Object.prototype.toString.call(input) === '[object Array]') {
    return 'array';
  } else if (input === null) {
    return 'null';
  }
  return typeof (input);
}
