function debounce(func, wait) {
  let timeout;
  return (...arg) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arg), wait);
  };
}

export default debounce;
