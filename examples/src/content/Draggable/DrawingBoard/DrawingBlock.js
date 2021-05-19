const defaultFragmentOptions = {
  id: null,
  classes: [],
  style: {},
};

const defaultInitialPosition = {
  top: 0,
  left: 0,
};

export default class DrawingBlock {
  constructor(template, canvas) {
    this.template = template || document.getElementById('DrawingBlockTemplate');
    this.canvas = canvas || document.getElementById('DrawingBlockCanvas');
  }

  get clone() {
    return this.template.content.cloneNode(true);
  }

  edit(fragment = this.clone, options = defaultFragmentOptions) {
    const fragmentChild = fragment.firstElementChild;
    const fragmentOptions = {
      ...defaultFragmentOptions,
      ...options,
    };

    fragmentChild.id = fragmentChild.id || fragmentOptions.id;
    fragmentChild.classList.add(...fragmentOptions.classes);

    fragmentChild.style.top = fragmentOptions.style.top || null;
    fragmentChild.style.left = fragmentOptions.style.left || null;

    return fragment;
  }

  getPositionWithinCanvas(sensorPosition, canvasPosition, initialPosition = defaultInitialPosition) {
    return {
      top: sensorPosition.top - canvasPosition.top - initialPosition.top,
      left: sensorPosition.left - canvasPosition.left - initialPosition.left,
    };
  }
}
