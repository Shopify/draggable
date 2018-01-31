import flipSign from '../../scripts/utils/flip-sign';

const scaleFactor = 0.725;
const translateFactors = {
  bottom: 0.075,
  middle: 0.5,
  top: 0.975,
};
const Classes = {
  bottom: 'Plate--levelBottom',
  middle: 'Plate--levelMiddle',
  top: 'Plate--levelTop',
};

function calculatePlateScale(value, max, factor) {
  const step1 = Math.abs(value) / max;
  const step2 = step1 - step1 * factor;

  return 1 - step2; // step 3
}

export default class Plate {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.plates = {
      bottom: wrapper.getElementsByClassName(Classes.bottom)[0],
      middle: wrapper.getElementsByClassName(Classes.middle)[0],
      top: wrapper.getElementsByClassName(Classes.top)[0],
    };
    this.threshold = {
      min: -27.2,
      max: 27.2,
    };
    this.initialMousePosition = {
      x: 0,
      y: 0,
    };
  }

  setThreshold() {
    const newThreshold = this.wrapper.offsetWidth / 10;

    this.threshold = {
      min: flipSign(newThreshold),
      max: newThreshold,
    };
  }

  setInitialMousePosition(sensorEvent) {
    this.initialMousePosition.x = sensorEvent.clientX;
    this.initialMousePosition.y = sensorEvent.clientY;
  }

  dragWarp(source, sensorEvent) {
    const adjustedX = this._offsetWithinThreshold(this.initialMousePosition.x, sensorEvent.clientX);
    const adjustedY = this._offsetWithinThreshold(this.initialMousePosition.y, sensorEvent.clientY);

    this._scalePlates(adjustedX, adjustedY);
    this._translateShadow(adjustedX, adjustedY);
    this._translateEachPlate(adjustedX, adjustedY);
  }

  resetWarp() {
    this._scalePlates(0, 0);
    this._translateShadow(0, 0);
    this._translateEachPlate(0, 0);
  }

  _offsetWithinThreshold(initialPosition, currentPosition) {
    const updatedPosition = initialPosition - currentPosition;
    let offset = updatedPosition;

    if (updatedPosition < this.threshold.min) {
      offset = this.threshold.min;
    } else if (updatedPosition > this.threshold.max) {
      offset = this.threshold.max;
    }

    return offset;
  }

  _scalePlates(x, y) {
    const scaleX = calculatePlateScale(x, this.threshold.max, scaleFactor);
    const scaleY = calculatePlateScale(y, this.threshold.max, scaleFactor);

    this.wrapper.style.setProperty('--plate-scale-x', `${scaleX}`);
    this.wrapper.style.setProperty('--plate-scale-y', `${scaleY}`);
  }

  _translateEachPlate(x, y) {
    for (const plateLevel in this.plates) {
      if (this.plates.hasOwnProperty(plateLevel)) {
        const translateX = flipSign(x * 2) * translateFactors[plateLevel];
        const translateY = flipSign(y * 2) * translateFactors[plateLevel];

        this.wrapper.style.setProperty(`--${plateLevel}-translate-x`, `${translateX}px`);
        this.wrapper.style.setProperty(`--${plateLevel}-translate-y`, `${translateY}px`);
      }
    }
  }

  _translateShadow(x, y) {
    this.wrapper.style.setProperty('--shadow-offset-x', `${x / 2}px`);
    this.wrapper.style.setProperty('--shadow-offset-y', `${y / 2}px`);
  }
}
