function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...arg: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arg), wait);
  };
}

export default debounce;
