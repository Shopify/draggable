import AbstractEvent from '../AbstractEvent';

describe('AbstractEvent', () => {
  it('should be of type AbstractEvent', () => {
    const event = new AbstractEvent();

    expect(event).toBeInstanceOf(AbstractEvent);
  });

  it('should initialize with correct type', () => {
    const event = new AbstractEvent();

    expect(event.type).toBe('event');
  });

  it('should initialize in uncancelable state', () => {
    const event = new AbstractEvent();

    expect(event.cancelable).toBe(false);
  });

  it('should initialize in uncancelled state', () => {
    const event = new AbstractEvent();

    expect(event.canceled()).toBe(false);
  });

  it('should initialize with data', () => {
    const event = new AbstractEvent({
      foo: 'bar',
    });

    expect(event.data).toMatchObject({
      foo: 'bar',
    });
  });

  it('should cancel event', () => {
    const event = new AbstractEvent();

    expect(event.canceled()).toBe(false);

    event.cancel();

    expect(event.canceled()).toBe(true);
  });
});
