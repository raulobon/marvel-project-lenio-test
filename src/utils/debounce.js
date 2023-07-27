export default function debounce(fn, delay) {
  let timer = null;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
