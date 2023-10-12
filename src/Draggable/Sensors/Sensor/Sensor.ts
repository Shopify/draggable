import {SensorEvent} from '../SensorEvent';

export interface DelayOptions {
  mouse: number;
  drag: number;
  touch: number;
}

interface Options {
  handle?: string;
  draggable?: string;
  delay?: Partial<DelayOptions> | number;
  distance?: number;
}

const defaultDelay: DelayOptions = {
  mouse: 0,
  drag: 0,
  touch: 100,
};

/**
 * Base sensor class. Extend from this class to create a new or custom sensor
 * @class Sensor
 * @module Sensor
 */
export default class Sensor {
  public containers: HTMLElement[];
  public options: Options;
  public delay: DelayOptions;
  public dragging = false;
  public currentContainer: HTMLElement | null = null;
  public originalSource: HTMLElement | null = null;
  public startEvent: Event | null = null;
  public lastEvent: SensorEvent | null = null;

  /**
   * Sensor constructor.
   * @constructs Sensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  constructor(containers: HTMLElement[] = [], options?: Options) {
    /**
     * Current containers
     * @property containers
     * @type {HTMLElement[]}
     */
    this.containers = [...containers];

    /**
     * Current options
     * @property options
     * @type {Object}
     */
    this.options = options || {};

    /**
     * The delay of each sensor
     * @property delay
     * @type {Object}
     */
    this.delay = calcDelay(options ? options.delay : undefined);
  }

  /**
   * Attaches sensors event listeners to the DOM
   * @return {Sensor}
   */
  attach() {
    return this;
  }

  /**
   * Detaches sensors event listeners to the DOM
   * @return {Sensor}
   */
  detach() {
    return this;
  }

  /**
   * Adds container to this sensor instance
   * @param {...HTMLElement} containers - Containers you want to add to this sensor
   * @example draggable.addContainer(document.body)
   */
  addContainer(...containers: HTMLElement[]) {
    this.containers = [...this.containers, ...containers];
  }

  /**
   * Removes container from this sensor instance
   * @param {...HTMLElement} containers - Containers you want to remove from this sensor
   * @example draggable.removeContainer(document.body)
   */
  removeContainer(...containers: HTMLElement[]) {
    this.containers = this.containers.filter(
      (container) => !containers.includes(container),
    );
  }

  /**
   * Triggers event on target element
   * @param {HTMLElement} element - Element to trigger event on
   * @param {SensorEvent} sensorEvent - Sensor event to trigger
   */
  trigger(element: HTMLElement, sensorEvent: SensorEvent) {
    const event = document.createEvent('Event');
    (event as any).detail = sensorEvent;
    event.initEvent(sensorEvent.type, true, true);
    element.dispatchEvent(event);
    this.lastEvent = sensorEvent;

    return sensorEvent;
  }
}

/**
 * Calculate the delay of each sensor through the delay in the options
 * @param {undefined|Number|Object} optionsDelay - the delay in the options
 * @return {Object}
 */
function calcDelay(
  optionsDelay?: Partial<DelayOptions> | number,
): DelayOptions {
  if (optionsDelay == null) {
    return {...defaultDelay};
  }

  if (typeof optionsDelay === 'number') {
    return Object.keys(defaultDelay).reduce<DelayOptions>(
      (options, key) => {
        return {
          ...options,
          [key]: optionsDelay,
        };
      },
      {...defaultDelay},
    );
  }

  return Object.keys(defaultDelay).reduce<DelayOptions>(
    (options, key: keyof DelayOptions) => {
      if (optionsDelay[key] == null) {
        return options;
      }

      return {
        ...options,
        [key]: optionsDelay[key],
      };
    },
    {...defaultDelay},
  );
}
