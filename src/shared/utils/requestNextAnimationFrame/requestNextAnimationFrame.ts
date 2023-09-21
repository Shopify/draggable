export default function requestNextAnimationFrame(callback: () => void) {
  return requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}
