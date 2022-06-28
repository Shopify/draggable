import {SensorEvent} from 'Draggable/Sensors/SensorEvent';

const defaultDelay: SensorDelayOptions = {
  mouse: 0,
  drag: 0,
  touch: 100,
};

export interface SensorDelayOptions {
  mouse?: number;
  drag?: number;
  touch?: number;
}

export interface SensorOptions {
  delay?: number | SensorDelayOptions;
  handle?: string | NodeList | HTMLElement[] | HTMLElement | ((currentElement: HTMLElement) => HTMLElement);
  draggable?: string | ((element: HTMLElement) => void) | NodeList | Array<HTMLElement> | HTMLElement;
  distance?: number;
}

/**
 * Base sensor class. Extend from this class to create a new or custom sensor
 */
export default class Sensor {
  /** Current containers */
  containers: HTMLElement[];
  /** Current options */
  options: SensorOptions;
  /** Current drag state */
  dragging: boolean = false;
  /** Current container */
  currentContainer: HTMLElement = null;
  /** Draggables original source element */
  originalSource: HTMLElement = null;
  /** The event of the initial sensor down */
  startEvent: Event = null;
  delay: SensorDelayOptions;
  lastEvent: SensorEvent;

  constructor(containers: HTMLElement[] | NodeList | HTMLElement = [], options: SensorOptions = {}) {
    if (containers instanceof NodeList || containers instanceof Array) this.containers = <HTMLElement[]>[...containers];
    else if (containers instanceof HTMLElement) this.containers = [containers];

    this.options = {...options};
    this.delay = calcDelay(options.delay);
  }

  attach(): Sensor | void {
    return this;
  }

  detach(): Sensor | void {
    return this;
  }

  /**
   * Adds container to this sensor instance
   * @param {...HTMLElement} containers - Containers you want to add to this sensor
   * @example draggable.addContainer(document.body)
   */
  addContainer(...containers) {
    this.containers = [...this.containers, ...containers];
  }

  /**
   * Removes container from this sensor instance
   * @param {...HTMLElement} containers - Containers you want to remove from this sensor
   * @example draggable.removeContainer(document.body)
   */
  removeContainer(...containers) {
    this.containers = this.containers.filter((container) => !containers.includes(container));
  }

  /**
   * Triggers event on target element
   * @param {HTMLElement} element - Element to trigger event on
   * @param {SensorEvent} sensorEvent - Sensor event to trigger
   */
  trigger(element: HTMLElement, sensorEvent: SensorEvent) {
    const event = new CustomEvent(sensorEvent.type, {
      detail: sensorEvent,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
    this.lastEvent = sensorEvent;

    return sensorEvent;
  }
}

/** Calculate the delay of each sensor through the delay in the options */
function calcDelay(optionsDelay?: number | SensorDelayOptions): SensorDelayOptions {
  const delay = {};

  if (optionsDelay === undefined) return {...defaultDelay};

  if (typeof optionsDelay === 'number') {
    for (const key in defaultDelay) {
      if (defaultDelay.hasOwnProperty(key)) {
        delay[key] = optionsDelay;
      }
    }
    return delay;
  }

  for (const key in defaultDelay) {
    if (defaultDelay.hasOwnProperty(key)) {
      if (optionsDelay[key] === undefined) delay[key] = defaultDelay[key];
      else delay[key] = optionsDelay[key];
    }
  }

  return delay;
}
