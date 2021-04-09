let timeout: ReturnType<typeof setTimeout>;
function debounce(func: () => void, wait: number) {
  clearTimeout(timeout);
  timeout = setTimeout(() => func(), wait);
}

export default debounce;
