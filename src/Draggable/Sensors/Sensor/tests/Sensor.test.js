import Sensor from '../Sensor';

describe('Sensor', () => {
  describe('#constructor', () => {
    it('should initialize with default containers and options', () => {
      const sensor = new Sensor();

      expect(sensor.containers).toMatchObject([]);
      expect(sensor.options).toMatchObject({});
    });

    it('should initialize with containers and options', () => {
      const expectedContainers = ['expectedContainer'];
      const expectedOptions = {expectedOptions: true};
      const sensor = new Sensor(expectedContainers, expectedOptions);

      expect(sensor.containers).toEqual(expectedContainers);
      expect(sensor.options).toEqual(expectedOptions);
    });
  });

  describe('#attach', () => {
    it('should return self', () => {
      const sensor = new Sensor();
      const returnValue = sensor.attach();

      expect(returnValue).toBe(sensor);
    });
  });

  describe('#detach', () => {
    it('should return self', () => {
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
    it('should dispatch event on element', () => {
      const sensor = new Sensor();
      const element = document.createElement('div');
      const expectedEvent = {
        type: 'my:event',
        value: 'some value',
      };

      let eventDispatched;

      element.addEventListener(
        'my:event',
        (event) => {
          eventDispatched = event;
        },
        true,
      );

      const returnValue = sensor.trigger(element, expectedEvent);

      expect(eventDispatched.detail).toBe(expectedEvent);
      expect(eventDispatched.type).toBe('my:event');
      expect(eventDispatched.target).toBe(element);
      expect(returnValue).toBe(expectedEvent);
      expect(sensor.lastEvent).toBe(expectedEvent);
    });
  });
});
