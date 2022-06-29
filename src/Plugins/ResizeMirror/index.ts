import { DragOverContainerEvent, DragOverEvent } from 'Draggable';
import { MirrorCreatedEvent } from 'Draggable/Plugins/Mirror/MirrorEvent';
import AbstractPlugin from 'shared/AbstractPlugin';
import { requestNextAnimationFrame } from 'shared/utils';

const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');
const onDragOver = Symbol('onDragOver');
const resize = Symbol('resize');

/**
 * ResizeMirror default options
 * @property {Object} defaultOptions
 * @type {Object}
 */
export const defaultOptions = {};

export type ResizeMirrorOptions = Record<string, unknown>;

/**
 * The ResizeMirror plugin resizes the mirror element to the dimensions of the draggable element that the mirror is hovering over
 * @class ResizeMirror
 * @module ResizeMirror
 * @extends AbstractPlugin
 */
export default class ResizeMirror extends AbstractPlugin {
  options: ResizeMirrorOptions;
  lastWidth = 0;
  lastHeight = 0;
  mirror: HTMLElement = null;

  /**
   * ResizeMirror constructor.
   * @constructs ResizeMirror
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorDestroy] = this[onMirrorDestroy].bind(this);
    this[onDragOver] = this[onDragOver].bind(this);
  }

  attach() {
    this.draggable
      .on('mirror:created', this[onMirrorCreated])
      .on('drag:over', this[onDragOver])
      .on('drag:over:container', this[onDragOver]);
  }

  detach() {
    this.draggable
      .off('mirror:created', this[onMirrorCreated])
      .off('mirror:destroy', this[onMirrorDestroy])
      .off('drag:over', this[onDragOver])
      .off('drag:over:container', this[onDragOver]);
  }

  getOptions = () => this.draggable.options.resizeMirror ?? {};

  private [onMirrorCreated] = ({ mirror }: MirrorCreatedEvent) => {
    this.mirror = mirror;
  };

  private [onMirrorDestroy] = () => {
    this.mirror = null;
  };

  private [onDragOver] = (
    dragEvent: DragOverEvent | DragOverContainerEvent
  ) => {
    this[resize](dragEvent);
  };

  private [resize] = ({
    overContainer,
    over,
  }: DragOverEvent | DragOverContainerEvent) => {
    requestAnimationFrame(() => {
      if (!this.mirror.parentNode) return;

      if (this.mirror.parentNode !== overContainer)
        overContainer.appendChild(this.mirror);

      const overElement =
        over ||
        this.draggable.getDraggableElementsForContainer(overContainer)[0];

      if (!overElement) return;

      requestNextAnimationFrame(() => {
        const overRect = overElement.getBoundingClientRect();

        if (
          this.lastHeight === overRect.height &&
          this.lastWidth === overRect.width
        ) {
          return;
        }

        this.mirror.style.width = `${overRect.width}px`;
        this.mirror.style.height = `${overRect.height}px`;

        this.lastWidth = overRect.width;
        this.lastHeight = overRect.height;
      });
    });
  };
}
