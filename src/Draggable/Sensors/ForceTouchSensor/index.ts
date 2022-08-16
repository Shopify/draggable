import { closest } from '../../../shared/utils';
import Sensor from '../Sensor';
import {
  DragStartSensorEvent,
  DragMoveSensorEvent,
  DragStopSensorEvent,
  DragPressureSensorEvent,
} from '../SensorEvent';

const onMouseForceWillBegin = Symbol('onMouseForceWillBegin');
const onMouseForceDown = Symbol('onMouseForceDown');
const onMouseDown = Symbol('onMouseDown');
const onMouseForceChange = Symbol('onMouseForceChange');
const onMouseMove = Symbol('onMouseMove');
const onMouseUp = Symbol('onMouseUp');
const onMouseForceGlobalChange = Symbol('onMouseForceGlobalChange');

export default class ForceTouchSensor extends Sensor {
  mightDrag = false;

  attach() {
    for (const container of this.containers) {
      container.addEventListener(
        'webkitmouseforcewillbegin',
        this[onMouseForceWillBegin],
        false
      );
      container.addEventListener(
        'webkitmouseforcedown',
        this[onMouseForceDown],
        false
      );
      container.addEventListener('mousedown', this[onMouseDown], true);
      container.addEventListener(
        'webkitmouseforcechanged',
        this[onMouseForceChange],
        false
      );
    }

    document.addEventListener('mousemove', this[onMouseMove]);
    document.addEventListener('mouseup', this[onMouseUp]);
  }

  detach() {
    for (const container of this.containers) {
      container.removeEventListener(
        'webkitmouseforcewillbegin',
        this[onMouseForceWillBegin],
        false
      );
      container.removeEventListener(
        'webkitmouseforcedown',
        this[onMouseForceDown],
        false
      );
      container.removeEventListener('mousedown', this[onMouseDown], true);
      container.removeEventListener(
        'webkitmouseforcechanged',
        this[onMouseForceChange],
        false
      );
    }

    document.removeEventListener('mousemove', this[onMouseMove]);
    document.removeEventListener('mouseup', this[onMouseUp]);
  }

  private [onMouseForceWillBegin] = (event: MouseEvent) => {
    event.preventDefault();
    this.mightDrag = true;
  };

  private [onMouseForceDown] = (event: MouseEvent) => {
    if (this.dragging) return;

    const target = <HTMLElement>(
      document.elementFromPoint(event.clientX, event.clientY)
    );
    const container = <HTMLElement>event.currentTarget;

    if (
      this.options.handle &&
      target &&
      !closest(target, this.options.handle)
    ) {
      return;
    }

    const originalSource = closest(target, this.options.draggable);

    if (!originalSource) {
      return;
    }

    const dragStartEvent = new DragStartSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container,
      originalSource,
      originalEvent: event,
    });

    this.trigger(container, dragStartEvent);

    this.currentContainer = container;
    this.dragging = !dragStartEvent.defaultPrevented;
    this.mightDrag = false;
  };

  private [onMouseUp] = (event) => {
    if (!this.dragging) return;

    const dragStopEvent = new DragStopSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target: null,
      container: <HTMLElement>this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    this.currentContainer = null;
    this.dragging = false;
    this.mightDrag = false;
  };

  private [onMouseDown] = (event) => {
    if (!this.mightDrag) return;

    // Need workaround for real click
    // Cancel potential drag events
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
  };

  private [onMouseMove] = (event) => {
    if (!this.dragging) return;

    const target = <HTMLElement>(
      document.elementFromPoint(event.clientX, event.clientY)
    );

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: <HTMLElement>this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  };

  private [onMouseForceChange] = (event) => {
    if (this.dragging) return;

    const target = event.target;
    const container = event.currentTarget;

    const dragPressureEvent = new DragPressureSensorEvent({
      pressure: event.webkitForce,
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container,
      originalEvent: event,
    });

    this.trigger(container, dragPressureEvent);
  };

  private [onMouseForceGlobalChange] = (event) => {
    if (!this.dragging) return;

    const target = <HTMLElement>event.target;

    const dragPressureEvent = new DragPressureSensorEvent({
      pressure: event.webkitForce,
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: <HTMLElement>this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragPressureEvent);
  };
}
