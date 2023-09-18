import AbstractPlugin from 'shared/AbstractPlugin';

export class TestPlugin extends AbstractPlugin {
  constructor(draggable) {
    super(draggable);

    jest.spyOn(this, 'attachFunction').mockImplementation();
    jest.spyOn(this, 'detachFunction').mockImplementation();
  }

  attach() {
    this.attachFunction();
  }

  detach() {
    this.detachFunction();
  }

  /* eslint-disable no-empty-function */
  attachFunction() {}
  detachFunction() {}
  /* eslint-enable no-empty-function */
}
