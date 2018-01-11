const requestAnimationFrameTimeout = 15;

window.requestAnimationFrame = (callback) => {
  return setTimeout(callback, requestAnimationFrameTimeout);
};

window.cancelAnimationFrame = (id) => {
  return clearTimeout(id);
};
