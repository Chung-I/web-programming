function curringSum(a) {
  let sum = a;
  return function (b) {
    sum += b;
    return function (c) {
      sum += c;
      return sum;
    };
  };
}
