import AbstractEvent from '.';

describe('AbstractEvent', () => {
  it('is of type AbstractEvent', () => {
    const event = new AbstractEvent();

    expect(event).toBeInstanceOf(AbstractEvent);
  });

  it('initializes with correct type', () => {
    const event = new AbstractEvent();

    expect(event.type).toBe('event');
  });

  it('initializes in uncancelable state', () => {
    const event = new AbstractEvent();

    expect(event.cancelable).toBe(false);
  });

  it('initializes in uncancelled state', () => {
    const event = new AbstractEvent();

    expect(event.canceled()).toBe(false);
  });

  it('initializes with data', () => {
    const event = new AbstractEvent({
      foo: 'bar',
    });

    expect(event.data).toMatchObject({
      foo: 'bar',
    });
  });

  it('cancels the event', () => {
    const event = new AbstractEvent();

    expect(event.canceled()).toBe(false);

    event.cancel();

    expect(event.canceled()).toBe(true);
  });
});
