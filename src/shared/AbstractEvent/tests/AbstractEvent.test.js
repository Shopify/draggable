import AbstractEvent from '../AbstractEvent';

describe('AbstractEvent', () => {
  test('should be of type AbstractEvent', () => {
    const event = new AbstractEvent();

    expect(event).toBeInstanceOf(AbstractEvent);
  });

  test('should initialize with correct type', () => {
    const event = new AbstractEvent();

    expect(event.type).toBe('event');
  });

  test('should initialize in uncancelable state', () => {
    const event = new AbstractEvent();

    expect(event.cancelable).toBe(false);
  });

  test('should initialize in uncancelled state', () => {
    const event = new AbstractEvent();

    expect(event.canceled()).toBe(false);
  });

  test('should initialize with data', () => {
    const event = new AbstractEvent({
      foo: 'bar',
    });

    expect(event.data).toMatchObject({
      foo: 'bar',
    });
  });

  test('should cancel event', () => {
    const event = new AbstractEvent();

    expect(event.canceled()).toBe(false);

    event.cancel();

    expect(event.canceled()).toBe(true);
  });
});
