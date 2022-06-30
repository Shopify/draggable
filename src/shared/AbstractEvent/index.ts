const canceled = Symbol('canceled');

export default class AbstractEvent extends Event {
  data: Record<string, unknown>;

  constructor(data?: Record<string, unknown>) {
    super(<string>data?.type, { ...data });
    this[canceled] = false;
    this.data = {...data};
  }

  get type() {
    return (<typeof AbstractEvent>this.constructor).type;
  }

  get cancelable() {
    return (<typeof AbstractEvent>this.constructor).cancelable;
  }

  cancel() {
    this[canceled] = true;
  }

  canceled() {
    return Boolean(this[canceled]);
  }

  clone(data) {
    return new AbstractEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'event';
  static cancelable = false;
}
