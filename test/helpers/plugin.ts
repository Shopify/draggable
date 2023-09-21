import AbstractPlugin from 'shared/AbstractPlugin';

export class TestPlugin extends AbstractPlugin {
  constructor(draggable: any) {
    super(draggable);

    /* eslint-disable jest/prefer-spy-on */
    this.attach = jest.fn();
    this.detach = jest.fn();
    /* eslint-enable jest/prefer-spy-on */
  }

  attach() {
    return jest.fn();
  }

  detach() {
    return jest.fn();
  }
}
