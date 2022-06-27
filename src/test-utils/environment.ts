import {REQUEST_ANIMATION_FRAME_TIMEOUT} from './helpers/environment';

window.requestAnimationFrame = (callback) => {
  return setTimeout(callback, REQUEST_ANIMATION_FRAME_TIMEOUT);
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
