import AbstractPlugin from 'shared/AbstractPlugin';

export class TestPlugin extends AbstractPlugin {
  constructor(draggable) {
    super(draggable);

    this.attachFunction = jest.fn();
    this.detachFunction = jest.fn();
  }

  attach() {
    this.attachFunction();
  }

  detach() {
    this.detachFunction();
  }
}
