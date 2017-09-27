export default class Mirror {
  constructor(draggable) {
    this.draggable = draggable;

    this._onMirrorCreated = this._onMirrorCreated.bind(this);
    this._onMirrorMove = this._onMirrorMove.bind(this);
  }

  attach() {
    this.draggable
      .on('mirror:created', this._onMirrorCreated)
      .on('mirror:created', onMirrorCreated)
      .on('mirror:move', this._onMirrorMove);
  }

  detach() {
    this.draggable
      .off('mirror:created', this._onMirrorCreated)
      .off('mirror:created', onMirrorCreated)
      .off('mirror:move', this._onMirrorMove);
  }

  _onMirrorCreated({mirror, source, sensorEvent}) {
    const mirrorClass = this.draggable.getClassNameFor('mirror');

    const setState = (data) => {
      this.mirrorOffset = data.mirrorOffset;
      return data;
    };

    Promise.resolve({mirror, source, sensorEvent, mirrorClass})
      .then(computeMirrorDimensions)
      .then(calculateMirrorOffset)
      .then(addMirrorClasses)
      .then(positionMirror())
      .then(removeMirrorID)
      .then(setState)
      .catch();
  }

  _onMirrorMove({mirror, sensorEvent}) {
    Promise.resolve({mirror, sensorEvent, mirrorOffset: this.mirrorOffset})
      .then(positionMirror({raf: true}))
      .catch();
  }
}

function onMirrorCreated({mirror, source}) {
  Promise.resolve({mirror, source})
    .then(resetMirror)
    .catch();
}

function resetMirror(data) {
  return withPromise((resolve) => {
    const {mirror, source} = data;

    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;
    mirror.style.width = `${source.offsetWidth}px`;
    mirror.style.height = `${source.offsetHeight}px`;

    resolve(data);
  });
}

function computeMirrorDimensions(data) {
  return withPromise((resolve) => {
    const {source} = data;
    const sourceRect = source.getBoundingClientRect();
    resolve({...data, sourceRect});
  });
}

function calculateMirrorOffset(data) {
  return withPromise((resolve) => {
    const {sensorEvent, sourceRect} = data;
    const mirrorOffset = {top: sensorEvent.clientY - sourceRect.top, left: sensorEvent.clientX - sourceRect.left};
    resolve({...data, mirrorOffset});
  });
}

function addMirrorClasses(data) {
  return withPromise((resolve) => {
    const {mirror, mirrorClass} = data;
    mirror.classList.add(mirrorClass);
    resolve(data);
  });
}

function removeMirrorID(data) {
  return withPromise((resolve) => {
    const {mirror} = data;
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve(data);
  });
}

function positionMirror({withFrame = false} = {}) {
  return (data) => {
    return withPromise((resolve) => {
      const {mirror, sensorEvent, mirrorOffset} = data;

      if (mirrorOffset) {
        const x = sensorEvent.clientX - mirrorOffset.left;
        const y = sensorEvent.clientY - mirrorOffset.top;

        mirror.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      resolve(data);
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
