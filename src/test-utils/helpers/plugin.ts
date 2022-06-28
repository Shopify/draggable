import AbstractPlugin from 'shared/AbstractPlugin';

export class TestPlugin extends AbstractPlugin {
  attachFunction? = jest.fn();
  detachFunction? = jest.fn();

  attach() {
    this.attachFunction();
  }

  detach() {
    this.detachFunction();
  }
}
