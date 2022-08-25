export let debounce = false;

export function setDebounce(timeoutTime) {
  debounce = true;
  setTimeout(() => {
    debounce = false;
  }, timeoutTime);
}
