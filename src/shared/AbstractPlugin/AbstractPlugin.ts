import {FixMeAny} from 'shared/types';

/**
 * All draggable plugins inherit from this class.
 * @abstract
 * @class AbstractPlugin
 * @module AbstractPlugin
 */
export abstract class AbstractPlugin {
  /**
   * AbstractPlugin constructor.
   * @constructs AbstractPlugin
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(protected draggable: FixMeAny) {}

  /**
   * Override to add listeners
   * @abstract
   */
  attach() {
    throw new Error('Not Implemented');
  }

  /**
   * Override to remove listeners
   * @abstract
   */
  detach() {
    throw new Error('Not Implemented');
  }
}
