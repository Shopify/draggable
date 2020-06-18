import {createSandbox} from 'helper';
import cloneNode from '../cloneNode';

const sampleMarkup = `
  <div class="CanvasContainer">
    <div class="FirstDiv">First</div>
    <canvas class="FirstCanvas" width="100" height="100"></canvas>
    <div class="SecondDiv">Second</div>
    <canvas class="SecondCanvas" widht="100" height="100"></canvas>
  </div>
`;

describe('utils', () => {
  let sandbox;
  let canvasContainer;
  let firstCanvas;
  let secondCanvas;
  let firstDiv;
  let secondDiv;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    canvasContainer = sandbox.querySelector('.CanvasContainer');
    firstCanvas = canvasContainer.querySelector('.FirstCanvas');
    secondCanvas = canvasContainer.querySelector('.SecondCanvas');
    firstDiv = canvasContainer.querySelector('.FirstDiv');
    secondDiv = canvasContainer.querySelector('.SecondDiv');

    const firstCtx = firstCanvas.getContext('2d');
    const secondCtx = secondCanvas.getContext('2d');

    firstCtx.fillRect(0, 0, 10, 10);
    secondCtx.fillRect(10, 10, 20, 20);
  });

  afterEach(() => {
    sandbox.parentNode.removeChild(sandbox);
  });

  it('clone canvas content when cloned node has canvas elements', () => {
    const newClone = cloneNode(canvasContainer, true);
    const newFirstCanvas = newClone.querySelector('.FirstCanvas');
    const newSecondCanvas = newClone.querySelector('.SecondCanvas');
    expect(newFirstCanvas.toDataURL()).toEqual(firstCanvas.toDataURL());
    expect(newSecondCanvas.toDataURL()).toEqual(secondCanvas.toDataURL());
  });

  it('clone nodes when cloned node has canvas elements', () => {
    const newClone = cloneNode(canvasContainer, true);
    const newFirstDiv = newClone.querySelector('.FirstDiv');
    const newSecondDiv = newClone.querySelector('.SecondDiv');
    expect(newFirstDiv.innerHTML).toEqual(firstDiv.innerHTML);
    expect(newSecondDiv.innerHTML).toEqual(secondDiv.innerHTML);
  });

  it('clone canvas content when cloned node is canvas', () => {
    const newCanvas = cloneNode(firstCanvas, true);
    expect(newCanvas.toDataURL()).toEqual(firstCanvas.toDataURL());
  });

  it('not clone child nodes when deep is false', () => {
    const newClone = cloneNode(canvasContainer);
    expect(newClone.childNodes).toHaveLength(0);
  });
});
