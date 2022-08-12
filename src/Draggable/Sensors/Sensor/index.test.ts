import { waitFor } from '@testing-library/dom';
import Sensor from '.';
import { SensorEvent, SensorEventData } from '../SensorEvent';

class MyEvent extends SensorEvent {
  static type = 'my:event';
}

describe('Sensor', () => {
  describe('#constructor', () => {
    it('initializes with default containers and options', () => {
      const sensor = new Sensor();

      expect(sensor.containers).toMatchObject([]);
      expect(sensor.options).toMatchObject({});
    });

    it('initializes with containers and options', () => {
      const expectedContainers = [
        'expectedContainer',
      ] as unknown as HTMLElement[];
      const expectedOptions = { delay: 2 };
      const sensor = new Sensor(expectedContainers, expectedOptions);

      expect(sensor.containers).toEqual(expectedContainers);
      expect(sensor.options).toEqual(expectedOptions);
    });

    describe('initializes with correct delay', () => {
      it('unset', () => {
        const sensor = new Sensor(undefined, {});

        expect(sensor.delay).toEqual({
          mouse: 0,
          drag: 0,
          touch: 100,
        });
      });

      it('number', () => {
        const sensor = new Sensor(undefined, { delay: 42 });

        expect(sensor.delay).toEqual({
          mouse: 42,
          drag: 42,
          touch: 42,
        });
      });

      it('object', () => {
        const sensor = new Sensor(undefined, {
          delay: { mouse: 42, drag: 142 },
        });

        expect(sensor.delay).toEqual({
          mouse: 42,
          drag: 142,
          touch: 100,
        });
      });
    });
  });

  describe('#attach', () => {
    it('returns self', () => {
      const sensor = new Sensor();
      const returnValue = sensor.attach();

      expect(returnValue).toBe(sensor);
    });
  });

  describe('#detach', () => {
    it('returns self', () => {
      const sensor = new Sensor();
      const returnValue = sensor.attach();

      expect(returnValue).toBe(sensor);
    });
  });

  describe('#addContainer', () => {
    it('adds container to sensor', () => {
      const containers = [document.documentElement, document.body];
      const sensor = new Sensor();

      expect(sensor.containers).toEqual([]);

      sensor.addContainer(...containers);

      expect(sensor.containers).toEqual(containers);
    });
  });

  describe('#removeContainer', () => {
    it('removes container to sensor', () => {
      const containers = [document.documentElement, document.body];
      const sensor = new Sensor(containers);

      expect(sensor.containers).toEqual(containers);

      sensor.removeContainer(...containers);

      expect(sensor.containers).toEqual([]);
    });
  });

  describe('#trigger', () => {
    it('dispatches event on element', async () => {
      const sensor = new Sensor();
      const element = document.createElement('button');
      let eventDispatched: CustomEvent<SensorEvent>;

      element.addEventListener(
        MyEvent.type,
        (event: CustomEvent<SensorEvent>) => {
          eventDispatched = event;
        }
      );

      const expectedEvent = new MyEvent({
        value: 'value',
      } as SensorEventData);

      const returnValue = await sensor.trigger(element, expectedEvent);

      expect(eventDispatched.type).toBe('my:event');
      expect(eventDispatched.detail).toBe(expectedEvent);
      expect(eventDispatched.target).toBe(element);
      expect(returnValue).toBe(expectedEvent);
      expect(sensor.lastEvent).toBe(expectedEvent);
    });
  });
});
