import {DRAG_DELAY, defaultTouchEventOptions} from './constants';
import {triggerEvent} from './event';

export function waitForDragDelay(dragDelay = DRAG_DELAY) {
  jest.runTimersToTime(dragDelay + 1);
}

export function clickMouse(element, {button = 0, ...options} = {}) {
  return triggerEvent(element, 'mousedown', {button, ...options});
}

export function moveMouse(element) {
  return triggerEvent(element, 'mousemove');
}

export function releaseMouse(element) {
  return triggerEvent(element, 'mouseup');
}

export function touchStart(element, options) {
  return triggerEvent(element, 'touchstart', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function touchMove(element, options) {
  return triggerEvent(element, 'touchmove', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function touchRelease(element, options) {
  return triggerEvent(element, 'touchend', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function dragStart(element, options) {
  return triggerEvent(element, 'dragstart', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function dragOver(element, options) {
  return triggerEvent(element, 'dragover', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function dragDrop(element, options) {
  return triggerEvent(element, 'drop', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function dragStop(element, options) {
  return triggerEvent(element, 'dragend', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function getDataTransferStub() {
  return {
    setData: jest.fn(),
    effectAllowed: null,
  };
}
