const requestNextAnimationFrame = (callback) =>
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });

export default requestNextAnimationFrame;
