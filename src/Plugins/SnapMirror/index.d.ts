/**
 * SnapMirror Plugin
 */

import type {AbstractPlugin} from "@shopify/draggable";

interface Point {
  x: number;
  y: number;
}

interface Target {
  x: number;
  y: number;
  range: number;
}

type TargetFunction = (x: number, y: number, instance) => Target;

interface SnapMirrorOptions {
  targets: Array<Target | TargetFunction>;
  relativePoints: Array<Point>;
  range: number;
}

export class SnapMirror extends AbstractPlugin {
  options: SnapMirrorOptions;
  protected attach(): void;
  protected detach(): void;
  grid(options: Target): TargetFunction;
  line(options: Target): TargetFunction;
}



