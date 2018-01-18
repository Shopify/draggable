// ES6 Document ready
// wait for the document to be ready : https://github.com/nickeljew/es6-docready
// -----------------------------------------------------------------------------
export function docReady(callback) {
  function completed() {
    document.removeEventListener('DOMContentLoaded', completed, false);
    window.removeEventListener('load', completed, false);
    callback();
  }

  // Events.on(document, 'DOMContentLoaded', completed);

  if (document.readyState === 'complete') {
    // handle it asynchronously to allow scripts the opportunity to delay ready
    setTimeout(callback);
  } else {
    // use the handy event callback
    document.addEventListener('DOMContentLoaded', completed, false);
    // a fallback to window.onload, that will always work
    window.addEventListener('load', completed, false);
  }
}
