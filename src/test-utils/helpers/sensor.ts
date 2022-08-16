import {
  DRAG_DELAY,
  defaultTouchEventOptions,
  defaultMouseEventOptions,
} from './constants';
import { triggerEvent } from './event';

export function waitForDragDelay({
  dragDelay = DRAG_DELAY,
  restoreDateMock = true,
} = {}) {
  const next = Date.now() + dragDelay + 1;
  const dateMock = jest.spyOn(Date, 'now').mockReturnValue(next);
  jest.advanceTimersByTime(dragDelay + 1);
  if (restoreDateMock) dateMock.mockRestore();

  return dateMock;
}

export const clickMouse = (element, options = {}) =>
  triggerEvent(element, 'mousedown', {
    ...defaultMouseEventOptions,
    ...options,
  });

export const moveMouse = (element, options = {}) =>
  triggerEvent(element, 'mousemove', {
    ...defaultMouseEventOptions,
    ...options,
  });

export const releaseMouse = (element, options = {}) =>
  triggerEvent(element, 'mouseup', {
    ...defaultMouseEventOptions,
    ...options,
  });

export const touchStart = (element, options?) =>
  triggerEvent(element, 'touchstart', {
    ...defaultTouchEventOptions,
    ...options,
  });

export const touchMove = (element, options?) =>
  triggerEvent(element, 'touchmove', {
    ...defaultTouchEventOptions,
    ...options,
  });

export const touchRelease = (element, options?) =>
  triggerEvent(element, 'touchend', {
    ...defaultTouchEventOptions,
    ...options,
  });

export const dragStart = (element, options?) =>
  triggerEvent(element, 'dragstart', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });

export const dragOver = (element, options?) =>
  triggerEvent(element, 'dragover', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });

export const dragDrop = (element, options?) =>
  triggerEvent(element, 'drop', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });

export const dragStop = (element, options?) =>
  triggerEvent(element, 'dragend', {
    dataTransfer: getDataTransferStub(),
    ...options,
  });

export const getDataTransferStub = () => ({
  setData: jest.fn(),
  effectAllowed: null,
});
