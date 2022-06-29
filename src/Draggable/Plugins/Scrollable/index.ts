import AbstractPlugin from '../../../shared/AbstractPlugin';
import { closest } from '../../../shared/utils';
import { DragMoveEvent, DragStartEvent } from '../../DragEvent';

export const onDragStart = Symbol('onDragStart');
export const onDragMove = Symbol('onDragMove');
export const onDragStop = Symbol('onDragStop');
export const scroll = Symbol('scroll');

export interface ScrollableOptions {
  speed: number;
  sensitivity: number;
  scrollableElements: HTMLElement[];
}

export const defaultOptions = {
  speed: 6,
  sensitivity: 50,
  scrollableElements: [],
};

/*** Returns element that scrolls document */
const getDocumentScrollingElement = (): HTMLElement =>
  <HTMLElement>document.scrollingElement ?? document.documentElement;

/*** Returns true if the passed element has overflow */
function hasOverflow(element: HTMLElement) {
  const overflowRegex = /(auto|scroll)/;
  const computedStyles = getComputedStyle(element, null);

  const overflow =
    computedStyles.getPropertyValue('overflow') +
    computedStyles.getPropertyValue('overflow-y') +
    computedStyles.getPropertyValue('overflow-x');

  return overflowRegex.test(overflow);
}

/*** Returns true if the passed element is statically positioned */
function isStaticallyPositioned(element: HTMLElement) {
  const position = getComputedStyle(element).getPropertyValue('position');
  return position === 'static';
}

/*** Finds closest scrollable element */
function closestScrollableElement(element: HTMLElement) {
  if (!element) return getDocumentScrollingElement();

  const position = getComputedStyle(element).getPropertyValue('position');
  const excludeStaticParents = position === 'absolute';

  const scrollableElement = closest(element, (parent: HTMLElement) => {
    if (excludeStaticParents && isStaticallyPositioned(parent)) {
      return false;
    }
    return hasOverflow(parent);
  });

  if (position === 'fixed' || !scrollableElement)
    return getDocumentScrollingElement();
  else return scrollableElement;
}

export default class Scrollable extends AbstractPlugin {
  options: ScrollableOptions;
  currentMousePosition: { clientX: number; clientY: number } = null;
  scrollAnimationFrame: number = null;
  scrollableElement: HTMLElement = null;
  findScrollableElementFrame: number = null;

  constructor(draggable) {
    super(draggable);
    this.options = { ...defaultOptions, ...this.getOptions() };
  }

  /*** Attaches plugins event listeners */
  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop]);
  }

  /*** Detaches plugins event listeners */
  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop]);
  }

  /*** Returns options passed through draggable */
  getOptions = () => this.draggable.options.scrollable ?? {};

  /*** Returns closest scrollable elements by element */
  getScrollableElement(target: HTMLElement): HTMLElement {
    if (this.hasDefinedScrollableElements()) {
      return (
        closest(target, this.options.scrollableElements) ||
        document.documentElement
      );
    } else return closestScrollableElement(target);
  }

  hasDefinedScrollableElements = () =>
    Boolean(this.options.scrollableElements.length !== 0);

  /*** Drag start handler. Finds closest scrollable parent in separate frame */
  private [onDragStart] = (dragEvent: DragStartEvent) => {
    this.findScrollableElementFrame = requestAnimationFrame(() => {
      this.scrollableElement = this.getScrollableElement(dragEvent.source);
    });
  };

  /*** Drag move handler. Remembers mouse position and initiates scrolling */
  private [onDragMove] = (dragEvent: DragMoveEvent) => {
    this.findScrollableElementFrame = requestAnimationFrame(() => {
      this.scrollableElement = this.getScrollableElement(
        dragEvent.sensorEvent.target
      );
    });

    if (!this.scrollableElement) return;

    const sensorEvent = dragEvent.sensorEvent;
    const scrollOffset = { x: 0, y: 0 };

    if ('ontouchstart' in window) {
      scrollOffset.y =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      scrollOffset.x =
        window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0;
    }

    this.currentMousePosition = {
      clientX: sensorEvent.clientX - scrollOffset.x,
      clientY: sensorEvent.clientY - scrollOffset.y,
    };

    this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
  };

  /*** Drag stop handler. Cancels scroll animations and resets state */
  private [onDragStop] = () => {
    cancelAnimationFrame(this.scrollAnimationFrame);
    cancelAnimationFrame(this.findScrollableElementFrame);

    this.scrollableElement = null;
    this.scrollAnimationFrame = null;
    this.findScrollableElementFrame = null;
    this.currentMousePosition = null;
  };

  /*** Scroll function that does the heavylifting */
  private [scroll] = () => {
    if (!this.scrollableElement || !this.currentMousePosition) return;

    cancelAnimationFrame(this.scrollAnimationFrame);

    const { speed, sensitivity } = this.options;

    const rect = this.scrollableElement.getBoundingClientRect();
    const bottomCutOff = rect.bottom > window.innerHeight;
    const topCutOff = rect.top < 0;
    const cutOff = topCutOff || bottomCutOff;

    const documentScrollingElement = getDocumentScrollingElement();
    const scrollableElement = this.scrollableElement;
    const clientX = this.currentMousePosition.clientX;
    const clientY = this.currentMousePosition.clientY;

    if (
      scrollableElement !== document.body &&
      scrollableElement !== document.documentElement &&
      !cutOff
    ) {
      const { offsetHeight, offsetWidth } = scrollableElement;

      if (rect.top + offsetHeight - clientY < sensitivity) {
        scrollableElement.scrollTop += speed;
      } else if (clientY - rect.top < sensitivity) {
        scrollableElement.scrollTop -= speed;
      }

      if (rect.left + offsetWidth - clientX < sensitivity) {
        scrollableElement.scrollLeft += speed;
      } else if (clientX - rect.left < sensitivity) {
        scrollableElement.scrollLeft -= speed;
      }
    } else {
      const { innerHeight, innerWidth } = window;

      if (clientY < sensitivity) {
        documentScrollingElement.scrollTop -= speed;
      } else if (innerHeight - clientY < sensitivity) {
        documentScrollingElement.scrollTop += speed;
      }

      if (clientX < sensitivity) {
        documentScrollingElement.scrollLeft -= speed;
      } else if (innerWidth - clientX < sensitivity) {
        documentScrollingElement.scrollLeft += speed;
      }
    }

    this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
  };
}
