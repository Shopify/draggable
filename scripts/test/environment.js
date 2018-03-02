const requestAnimationFrameTimeout = 15;

window.requestAnimationFrame = (callback) => {
  return setTimeout(callback, requestAnimationFrameTimeout);
};

window.cancelAnimationFrame = (id) => {
  return clearTimeout(id);
};

Event.prototype.stopPropagation = (function(_super) {
  return function(...args) {
    const returnValue = _super.call(this, ...args);
    this.stoppedPropagation = true;
    return returnValue;
  };
})(Event.prototype.stopPropagation);

Event.prototype.stopImmediatePropagation = (function(_super) {
  return function(...args) {
    const returnValue = _super.call(this, ...args);
    this.stoppedPropagation = true;
    return returnValue;
  };
})(Event.prototype.stopImmediatePropagation);
