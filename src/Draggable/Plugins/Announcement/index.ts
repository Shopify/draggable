import Draggable from '../..';
import AbstractPlugin from '../../../shared/AbstractPlugin';

const onInitialize = Symbol('onInitialize');
const onDestroy = Symbol('onDestroy');
const announceEvent = Symbol('announceEvent');
const announceMessage = Symbol('announceMessage');

const ARIA_RELEVANT = 'aria-relevant';
const ARIA_ATOMIC = 'aria-atomic';
const ARIA_LIVE = 'aria-live';
const ROLE = 'role';

export const defaultOptions = {
  expire: 7000,
};

export interface AnnouncementOptions {
  expire: number;
}

/*** Creates region element */
function createRegion() {
  const element = document.createElement('div');

  element.setAttribute('id', 'draggable-live-region');
  element.setAttribute(ARIA_RELEVANT, 'additions');
  element.setAttribute(ARIA_ATOMIC, 'true');
  element.setAttribute(ARIA_LIVE, 'assertive');
  element.setAttribute(ROLE, 'log');

  element.style.position = 'fixed';
  element.style.width = '1px';
  element.style.height = '1px';
  element.style.top = '-1px';
  element.style.overflow = 'hidden';

  return element;
}

const liveRegion: HTMLElement = createRegion();

function announce(message: string, { expire }: AnnouncementOptions) {
  const element = document.createElement('div');

  element.textContent = message;
  liveRegion.appendChild(element);

  return setTimeout(() => {
    liveRegion.removeChild(element);
  }, expire);
}

// Append live region element as early as possible
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(liveRegion);
});

export default class Announcement extends AbstractPlugin {
  /*** Plugin options */
  options: AnnouncementOptions;
  /*** Original draggable trigger method. Hack until we have onAll or on('all') */
  originalTriggerMethod: (event: CustomEvent) => Draggable;

  constructor(draggable) {
    super(draggable);

    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };
    this.originalTriggerMethod = this.draggable.trigger;
  }

  /**
   * Attaches listeners to draggable
   */
  attach() {
    this.draggable.on('draggable:initialize', this[onInitialize]);
  }

  /**
   * Detaches listeners from draggable
   */
  detach() {
    this.draggable.off('draggable:destroy', this[onDestroy]);
  }

  /**
   * Returns passed in options
   */
  getOptions = () => this.draggable.options.announcements ?? {};

  /**
   * Announces event
   * @private
   * @param {CustomEvent} event
   */
  private [announceEvent](event: CustomEvent) {
    const message = this.options[event.type];

    if (message && typeof message === 'string') this[announceMessage](message);
    if (message && typeof message === 'function')
      this[announceMessage](message(event));
  }

  /**
   * Announces message to screen reader
   * @private
   * @param {String} message
   */
  private [announceMessage](message: string) {
    announce(message, { expire: this.options.expire });
  }

  /*** Initialize hander */
  private [onInitialize] = () => {
    // Hack until there is an api for listening for all events
    this.draggable.trigger = (event: CustomEvent) => {
      try {
        this[announceEvent](event);
      } finally {
        // Ensure that original trigger is called
        this.originalTriggerMethod.call(this.draggable, event);
      }

      return this.draggable;
    };
  };

  /*** Destroy hander */
  private [onDestroy] = () => {
    this.draggable.trigger = this.originalTriggerMethod;
  };
}
