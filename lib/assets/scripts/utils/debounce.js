/**
 * Return a debounced version of the given function that delays its execution until after `delay` milliseconds have elapsed since the last time it was invoked.
 *
 * @param {function} func - The function to be debounced
 * @param {number} delay - The number of milliseconds to delay
 * @return {function} The debounced function
 */
const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
