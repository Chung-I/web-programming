function counter() {
  let count = 0;
  return {
    getCount() {
      return count;
    },
    increase() {
      count += 1;
    },
    decrease() {
      count -= 1;
    },
  };
}
