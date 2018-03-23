import {closest} from 'shared/utils';
import Sensor from '../Sensor';

import {
  KeyboardSensorEvent,
  DragKeyboardStartSensorEvent,
  DragKeyboardNextSensorEvent,
  DragKeyboardPreviousSensorEvent,
  DragKeyboardStopSensorEvent,
} from '../SensorEvent';

const onFocus = Symbol('onFocus');
const onBlur = Symbol('onBlur');
const onKeyup = Symbol('onKeyup');

export default class KeyboardSensor extends Sensor {
  constructor(containers = [], options = {}) {
    super(containers, options);

    this.potentialDraggable = null;

    this[onFocus] = this[onFocus].bind(this);
    this[onBlur] = this[onBlur].bind(this);
    this[onKeyup] = this[onKeyup].bind(this);
  }

  attach() {
    document.addEventListener('focus', this[onFocus], true);
    document.addEventListener('blur', this[onBlur], true);
    document.addEventListener('keydown', this[onKeyup], true);
  }

  detach() {
    document.removeEventListener('focus', this[onFocus], true);
    document.removeEventListener('blur', this[onBlur], true);
    document.removeEventListener('keydown', this[onKeyup], true);
  }

  [onFocus](event) {
    const draggableElement = closest(event.target, this.options.draggable);

    if (draggableElement === event.target) {
      this.potentialContainer = closest(event.target, this.containers);
      this.potentialDraggable = draggableElement;
    }
  }

  [onBlur]() {
    this.potentialDraggable = null;
  }

  [onKeyup](event) {
    if (!isRelevantKeycode(event)) {
      return;
    }

    if (this.potentialDraggable && !this.dragging && event.keyCode === KeyboardSensorEvent.SPACE) {
      this.dragging = !this.dragStart(event);
    } else if (this.dragging && event.keyCode === KeyboardSensorEvent.SPACE) {
      this.dragStop(event);
      this.dragging = false;
    }

    if (this.dragging && event.keyCode === KeyboardSensorEvent.RIGHT) {
      const dragNextEvent = new DragKeyboardNextSensorEvent({
        target: this.potentialDraggable,
        container: this.potentialContainer,
        keyCode: event.keyCode,
        originalEvent: event,
      });

      this.trigger(this.potentialContainer, dragNextEvent);
    }

    if (this.dragging && event.keyCode === KeyboardSensorEvent.LEFT) {
      const dragPreviousEvent = new DragKeyboardPreviousSensorEvent({
        target: this.potentialDraggable,
        container: this.potentialContainer,
        keyCode: event.keyCode,
        originalEvent: event,
      });

      this.trigger(this.potentialContainer, dragPreviousEvent);
    }
  }

  dragStart(event) {
    const dragStartEvent = new DragKeyboardStartSensorEvent({
      target: this.potentialDraggable,
      container: this.potentialContainer,
      keyCode: event.keyCode,
      originalEvent: event,
    });

    this.trigger(this.potentialContainer, dragStartEvent);

    return dragStartEvent.canceled();
  }

  dragStop(event) {
    const dragStopEvent = new DragKeyboardStopSensorEvent({
      target: this.potentialDraggable,
      container: this.potentialContainer,
      keyCode: event.keyCode,
      originalEvent: event,
    });

    this.trigger(this.potentialContainer, dragStopEvent);
  }

  //   _onFocus(event) {
  //     const draggable = event.target;
  //     const container = closest(event.target, this.containers);
  //     const isDraggable = Boolean(matches(event.target, this.options.handle || this.options.draggable));
  //     const isContainer = Boolean(container);
  //
  //     if (isDraggable && isContainer) {
  //       this.potentialDraggable = draggable;
  //       this.potentialContainer = container;
  //     }
  //   }
  //
  //   _onBlur() {
  //     this.potentialDraggable = null;
  //     this.potentialContainer = null;
  //   }
  //
  //   _onKeyup(event) {
  //     console.log(event.key, event.ctrlKey)
  //     if (!isRelevantKeycode(event)) {
  //       return;
  //     }
  //
  //     if ((this.potentialDraggable && this.potentialContainer) || this.dragging) {
  //       if (event.keyCode === SPACE_CODE) {
  //         this._toggleDrag(event);
  //         event.preventDefault();
  //         return;
  //       }
  //     }
  //
  //     if (!this.dragging) {
  //       return;
  //     }
  //
  //     let target;
  //
  //     if (event.keyCode === RIGHT_CODE || event.keyCode === DOWN_CODE) {
  //       // console.log(this._nextDraggable(this.currentDraggable));
  //       target = this._nextDraggable(this.currentDraggable) || this.allDraggableElements[0];
  //
  //     }
  //
  //     if (event.keyCode === LEFT_CODE || event.keyCode === UP_CODE) {
  //       // console.log(this._previousDraggable(this.currentDraggable));
  //       target = this._previousDraggable(this.currentDraggable) || this.allDraggableElements[this.allDraggableElements.length - 1];
  //       // event.preventDefault();
  //     }
  //
  //     if (!target) {
  //       return;
  //     }
  //
  //     const rect = target.getBoundingClientRect();
  //
  //     const dragMoveEvent = new DragMoveSensorEvent({
  //       clientX: rect.left + 1,
  //       clientY: rect.top + 1,
  //       target,
  //       container: this.currentContainer,
  //       originalEvent: event,
  //     });
  //
  //     this.trigger(this.currentContainer, dragMoveEvent);
  //     event.preventDefault();
  //   }
  //
  //   _toggleDrag(event) {
  //     if (this.dragging) {
  //       this._dragStop(event);
  //     } else {
  //       this._dragStart(event);
  //     }
  //   }
  //
  //   _dragStart(event) {
  //     const target = this.potentialDraggable;
  //     const container = this.potentialContainer;
  //
  //     const dragStartEvent = new DragStartSensorEvent({
  //       target,
  //       container,
  //       originalEvent: event,
  //     });
  //
  //     this.trigger(container, dragStartEvent);
  //
  //     this.currentDraggable = target;
  //     this.currentContainer = container;
  //     this.dragging = !dragStartEvent.canceled();
  //
  //     requestAnimationFrame(() => {
  //       if (!this.currentContainer) { return; }
  //       this.allDraggableElements = [];
  //       this.containers.forEach((currentContainer) => {
  //         this.allDraggableElements = [
  //           ...this.allDraggableElements,
  //           ...currentContainer.querySelectorAll(this.options.draggable),
  //         ];
  //       });
  //     });
  //   }
  //
  //   _dragStop(event) {
  //     const dragStopEvent = new DragStopSensorEvent({
  //       target: this.potentialDraggable,
  //       container: this.potentialContainer,
  //       originalEvent: event,
  //     });
  //
  //     this.trigger(this.currentContainer, dragStopEvent);
  //     this.dragging = false;
  //     this.allDraggableElements = null;
  //     this.currentDraggable = null;
  //     this.currentContainer = null;
  //   }
  //
  //   _nextDraggable(currentDraggable) {
  //     let currentIndex;
  //     this.allDraggableElements.forEach((draggableElement, index) => {
  //       if (draggableElement === currentDraggable) {
  //         currentIndex = index;
  //       }
  //     });
  //     return this.allDraggableElements[++currentIndex];
  //   }
  //
  //   _previousDraggable(currentDraggable) {
  //     let currentIndex;
  //     this.allDraggableElements.forEach((draggableElement, index) => {
  //       if (draggableElement === currentDraggable) {
  //         currentIndex = index;
  //       }
  //     });
  //     return this.allDraggableElements[--currentIndex];
  //   }
  // }
  //
}

function isRelevantKeycode(event) {
  return Boolean(
    event.keyCode === KeyboardSensorEvent.SPACE ||
      event.keyCode === KeyboardSensorEvent.DOWN ||
      event.keyCode === KeyboardSensorEvent.RIGHT ||
      event.keyCode === KeyboardSensorEvent.UP ||
      event.keyCode === KeyboardSensorEvent.LEFT,
  );
}
