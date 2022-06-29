import { SensorEvent } from 'Draggable/Sensors/SensorEvent';

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
  handle?:
    | string
    | NodeList
    | Element[]
    | Element
    | ((currentElement: Element) => Element);
  draggable?:
    | string
    | ((element: Element) => void)
    | NodeList
    | Array<Element>
    | Element;
  distance?: number;
}

/** Calculate the delay of each sensor through the delay in the options */
function calcDelay(
  optionsDelay?: number | SensorDelayOptions
): SensorDelayOptions {
  const delay = {};

  if (optionsDelay === undefined) return { ...defaultDelay };

  if (typeof optionsDelay === 'number') {
    for (const key in defaultDelay) {
      if (Object.prototype.hasOwnProperty.call(defaultDelay, key)) {
        delay[key] = optionsDelay;
      }
    }
    return delay;
  }

  for (const key in defaultDelay) {
    if (Object.prototype.hasOwnProperty.call(defaultDelay, key)) {
      if (optionsDelay[key] === undefined) delay[key] = defaultDelay[key];
      else delay[key] = optionsDelay[key];
    }
  }

  return delay;
}

/**
 * Base sensor class. Extend from this class to create a new or custom sensor
 */
export default class Sensor {
  /** Current containers */
  containers: Element[];
  /** Current options */
  options: SensorOptions;
  /** Current drag state */
  dragging = false;
  /** Current container */
  currentContainer: Element = null;
  /** Draggables original source element */
  originalSource: Element = null;
  /** The event of the initial sensor down */
  startEvent: Event = null;
  delay: SensorDelayOptions;
  lastEvent: SensorEvent;

  constructor(
    containers: Element[] | NodeList | Element = [],
    options: SensorOptions = {}
  ) {
    if (containers instanceof NodeList || containers instanceof Array)
      this.containers = [...(<Element[]>containers)];
    else if (containers instanceof Element) this.containers = [containers];

    this.options = { ...options };
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
   * @param {...Element} containers - Containers you want to add to this sensor
   * @example draggable.addContainer(document.body)
   */
  addContainer(...containers) {
    this.containers = [...this.containers, ...containers];
  }

  /**
   * Removes container from this sensor instance
   * @param {...Element} containers - Containers you want to remove from this sensor
   * @example draggable.removeContainer(document.body)
   */
  removeContainer(...containers) {
    this.containers = this.containers.filter(
      (container) => !containers.includes(container)
    );
  }

  /**
   * Triggers event on target element
   * @param {Element} element - Element to trigger event on
   * @param {SensorEvent} sensorEvent - Sensor event to trigger
   */
  trigger(element: Element, sensorEvent: SensorEvent) {
    const event = new CustomEvent<SensorEvent>(sensorEvent.type, {
      detail: sensorEvent,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
    this.lastEvent = sensorEvent;

    return sensorEvent;
  }
}
