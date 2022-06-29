import AbstractPlugin from 'shared/AbstractPlugin';

const onInitialize = Symbol('onInitialize');
const onDestroy = Symbol('onDestroy');

const defaultOptions = {};

export interface FocusableOptions extends Record<string, unknown> {}

/**
 * Focusable plugin
 * @class Focusable
 * @module Focusable
 * @extends AbstractPlugin
 */
export default class Focusable extends AbstractPlugin {
  options: FocusableOptions;

  constructor(draggable) {
    super(draggable);
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };
  }

  /**
   * Attaches listeners to draggable
   */
  attach() {
    this.draggable
      .on('draggable:initialize', this[onInitialize])
      .on('draggable:destroy', this[onDestroy]);
  }

  /**
   * Detaches listeners from draggable
   */
  detach() {
    this.draggable
      .off('draggable:initialize', this[onInitialize])
      .off('draggable:destroy', this[onDestroy]);

    // Remove modified elements when detach
    this[onDestroy]();
  }

  /**
   * Returns options passed through draggable
   */
  getOptions = () => this.draggable.options.focusable ?? {};

  /**
   * Returns draggable containers and elements
   */
  getElements = () => [
    ...this.draggable.containers,
    ...this.draggable.getDraggableElements(),
  ];

  /*** Intialize handler */
  private [onInitialize] = () => {
    // Can wait until the next best frame is available
    requestAnimationFrame(() => {
      this.getElements().forEach((element) => decorateElement(element));
    });
  };

  /*** Destroy handler */
  private [onDestroy] = () => {
    // Can wait until the next best frame is available
    requestAnimationFrame(() => {
      this.getElements().forEach((element) => stripElement(element));
    });
  };
}

/**
 * Keeps track of all the elements that are missing tabindex attributes
 * so they can be reset when draggable gets destroyed
 */
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
