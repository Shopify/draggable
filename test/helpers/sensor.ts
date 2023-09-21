import {
  DRAG_DELAY,
  defaultTouchEventOptions,
  defaultMouseEventOptions,
} from './constants';
import {triggerEvent} from './event';

export function waitForDragDelay({
  dragDelay = DRAG_DELAY,
  restoreDateMock = true,
} = {}) {
  const next = Date.now() + dragDelay + 1;
  const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => {
    return next;
  });
  jest.advanceTimersByTime(dragDelay + 1);
  if (restoreDateMock) {
    dateMock.mockRestore();
  }
  return dateMock;
}

export function clickMouse(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'mousedown', {
    ...defaultMouseEventOptions,
    ...options,
  });
}

export function moveMouse(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'mousemove', {
    ...defaultMouseEventOptions,
    ...options,
  });
}

export function releaseMouse(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'mouseup', {
    ...defaultMouseEventOptions,
    ...options,
  });
}

export function touchStart(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'touchstart', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function touchMove(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'touchmove', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function touchRelease(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'touchend', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function dragStart(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'dragstart', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function dragOver(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'dragover', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function dragDrop(element: HTMLElement, options = {}) {
  return triggerEvent(element, 'drop', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });
}

export function dragStop(element: HTMLElement, options = {}) {
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
