export const defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true,
};

export default class Mirror {
  constructor(draggable) {
    this.draggable = draggable;
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this.onMirrorCreated = this.onMirrorCreated.bind(this);
    this.onMirrorMove = this.onMirrorMove.bind(this);
  }

  attach() {
    this.draggable
      .on('mirror:created', this.onMirrorCreated)
      .on('mirror:move', this.onMirrorMove);
  }

  detach() {
    this.draggable
      .off('mirror:created', this.onMirrorCreated)
      .off('mirror:move', this.onMirrorMove);
  }

  getOptions() {
    return this.draggable.options.mirror || {};
  }

  onMirrorCreated({mirror, source, sensorEvent}) {
    const mirrorClass = this.draggable.getClassNameFor('mirror');

    const setState = ({mirrorOffset, initialX, initialY, ...args}) => {
      this.mirrorOffset = mirrorOffset;
      this.initialX = initialX;
      this.initialY = initialY;
      return {mirrorOffset, initialX, initialY, ...args};
    };

    const initialState = {
      mirror,
      source,
      sensorEvent,
      mirrorClass,
      options: this.options,
    };

    return Promise.resolve(initialState)
      // Fix reflow here
      .then(computeMirrorDimensions)
      .then(calculateMirrorOffset)
      .then(resetMirror)
      .then(addMirrorClasses)
      .then(positionMirror({initial: true}))
      .then(removeMirrorID)
      .then(setState);
  }

  onMirrorMove({mirror, sensorEvent}) {
    const initialState = {
      mirror,
      sensorEvent,
      mirrorOffset: this.mirrorOffset,
      options: this.options,
      initialX: this.initialX,
      initialY: this.initialY,
    };

    return Promise.resolve(initialState)
      .then(positionMirror({raf: true}));
  }
}

function computeMirrorDimensions({source, ...args}) {
  return withPromise((resolve) => {
    const sourceRect = source.getBoundingClientRect();
    resolve({source, sourceRect, ...args});
  });
}

function calculateMirrorOffset({sensorEvent, sourceRect, ...args}) {
  return withPromise((resolve) => {
    const mirrorOffset = {
      top: sensorEvent.clientY - sourceRect.top,
      left: sensorEvent.clientX - sourceRect.left,
    };

    resolve({sensorEvent, sourceRect, mirrorOffset, ...args});
  });
}

function resetMirror({mirror, source, options, ...args}) {
  return withPromise((resolve) => {
    let offsetHeight;
    let offsetWidth;

    if (options.constrainDimensions) {
      // Compute padding for source
      offsetHeight = source.clientHeight;
      offsetWidth = source.clientWidth;
    }

    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;
    mirror.style.margin = 0;

    if (options.constrainDimensions) {
      // remove padding from dimensions
      mirror.style.height = `${offsetHeight}px`;
      mirror.style.width = `${offsetWidth}px`;
    }

    resolve({mirror, source, options, ...args});
  });
}

function addMirrorClasses({mirror, mirrorClass, ...args}) {
  return withPromise((resolve) => {
    mirror.classList.add(mirrorClass);
    resolve({mirror, mirrorClass, ...args});
  });
}

function removeMirrorID({mirror, ...args}) {
  return withPromise((resolve) => {
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve({mirror, ...args});
  });
}

function positionMirror({withFrame = false, initial = false} = {}) {
  return ({mirror, sensorEvent, mirrorOffset, initialY, initialX, options, ...args}) => {
    return withPromise((resolve) => {
      const result = {
        mirror,
        sensorEvent,
        mirrorOffset,
        options,
        ...args,
      };

      if (mirrorOffset) {
        const x = sensorEvent.clientX - mirrorOffset.left;
        const y = sensorEvent.clientY - mirrorOffset.top;

        if ((options.xAxis && options.yAxis) || initial) {
          mirror.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        } else if (options.xAxis && !options.yAxis) {
          mirror.style.transform = `translate3d(${x}px, ${initialY}px, 0)`;
        } else if (options.yAxis && !options.xAxis) {
          mirror.style.transform = `translate3d(${initialX}px, ${y}px, 0)`;
        }

        if (initial) {
          result.initialX = x;
          result.initialY = y;
        }
      }

      resolve(result);
    }, {frame: withFrame});
  };
}

function withPromise(callback, {raf = false} = {}) {
  return new Promise((resolve, reject) => {
    if (raf) {
      requestAnimationFrame(() => {
        callback(resolve, reject);
      });
    } else {
      callback(resolve, reject);
    }
  });
}
