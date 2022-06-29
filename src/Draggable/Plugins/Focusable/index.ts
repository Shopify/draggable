import AbstractPlugin from '../../../shared/AbstractPlugin';

const onInitialize = Symbol('onInitialize');
const onDestroy = Symbol('onDestroy');

const defaultOptions = {};

export type FocusableOptions = Record<string, unknown>;

const elementsWithMissingTabIndex: HTMLElement[] = [];

function decorateElement(element: HTMLElement) {
  const hasMissingTabIndex = Boolean(
    !element.getAttribute('tabindex') && element.tabIndex === -1
  );

  if (hasMissingTabIndex) {
    elementsWithMissingTabIndex.push(element);
    element.tabIndex = 0;
  }
}

function stripElement(element: HTMLElement) {
  const tabIndexElementPosition = elementsWithMissingTabIndex.indexOf(element);

  if (tabIndexElementPosition !== -1) {
    element.tabIndex = -1;
    elementsWithMissingTabIndex.splice(tabIndexElementPosition, 1);
  }
}

export default class Focusable extends AbstractPlugin {
  options: FocusableOptions;

  constructor(draggable) {
    super(draggable);
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };
  }

  attach() {
    this.draggable
      .on('draggable:initialize', this[onInitialize])
      .on('draggable:destroy', this[onDestroy]);
  }

  detach() {
    this.draggable
      .off('draggable:initialize', this[onInitialize])
      .off('draggable:destroy', this[onDestroy]);

    // Remove modified elements when detach
    this[onDestroy]();
  }

  getOptions = () => this.draggable.options.focusable ?? {};

  getElements = () => [
    ...this.draggable.containers,
    ...this.draggable.getDraggableElements(),
  ];

  private [onInitialize] = () => {
    // Can wait until the next best frame is available
    requestAnimationFrame(() => {
      this.getElements().forEach((element) => decorateElement(element));
    });
  };

  private [onDestroy] = () => {
    // Can wait until the next best frame is available
    requestAnimationFrame(() => {
      this.getElements().forEach((element) => stripElement(element));
    });
  };
}
