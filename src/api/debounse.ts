function debounce(func: () => unknown, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), wait);
  };
}

export default debounce;
