export function createSandbox(content) {
  const sandbox = document.createElement('div');
  sandbox.innerHTML = content;
  document.body.appendChild(sandbox);

  return sandbox;
}

export function withElementFromPoint(elementFromPoint, callback) {
  const originalElementFromPoint = document.elementFromPoint;
  document.elementFromPoint = () => elementFromPoint;
  callback();
  document.elementFromPoint = originalElementFromPoint;
}

export const REQUEST_ANIMATION_FRAME_TIMEOUT = 15;

export function waitForRequestAnimationFrame(
  requestAnimationFrameTimeout = REQUEST_ANIMATION_FRAME_TIMEOUT,
) {
  jest.runTimersToTime(requestAnimationFrameTimeout + 1);
}
