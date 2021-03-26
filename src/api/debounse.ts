function debounce(func: FunctionStringCallback, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...arg: [data: string]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arg), wait);
  };
}

export default debounce;
