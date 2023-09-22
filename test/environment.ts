import {REQUEST_ANIMATION_FRAME_TIMEOUT} from './helpers/environment';

declare global {
  export interface Event {
    stoppedPropagation: boolean;
  }
}

window.requestAnimationFrame = (callback) => {
  return setTimeout(callback, REQUEST_ANIMATION_FRAME_TIMEOUT);
};

window.cancelAnimationFrame = (id) => {
  return clearTimeout(id);
};

Event.prototype.stopPropagation = (function (_super) {
  return function (
    this: Event,
    ...args: Parameters<typeof Event.prototype.stopPropagation>
  ) {
    const returnValue = _super.call(this, ...args);
    this.stoppedPropagation = true;
    return returnValue;
  };
})(Event.prototype.stopPropagation);

Event.prototype.stopImmediatePropagation = (function (_super) {
  return function (
    this: Event,
    ...args: Parameters<typeof Event.prototype.stopImmediatePropagation>
  ) {
    const returnValue = _super.call(this, ...args);
    this.stoppedPropagation = true;
    return returnValue;
  };
})(Event.prototype.stopImmediatePropagation);
