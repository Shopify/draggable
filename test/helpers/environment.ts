import {setImmediate} from 'timers';

export function createSandbox(content: string) {
  const sandbox = document.createElement('div');
  sandbox.innerHTML = content;
  document.body.appendChild(sandbox);

  return sandbox;
}

export function withElementFromPoint(
  elementFromPoint: HTMLElement,
  callback: () => void,
) {
  const originalElementFromPoint = document.elementFromPoint;
  document.elementFromPoint = () => elementFromPoint;
  callback();
  document.elementFromPoint = originalElementFromPoint;
}

export const REQUEST_ANIMATION_FRAME_TIMEOUT = 15;

export function waitForRequestAnimationFrame(
  requestAnimationFrameTimeout = REQUEST_ANIMATION_FRAME_TIMEOUT,
) {
  jest.advanceTimersByTime(requestAnimationFrameTimeout + 1);
}

export function waitForPromisesToResolve() {
  return new Promise((resolve) => setImmediate(resolve));
}
