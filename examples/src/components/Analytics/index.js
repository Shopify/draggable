function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

export default class Analytics {
  constructor(ua) {
    this.ua = ua;
  }

  init() {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('🤖 Analytics disabled in local development.');
      return;
    }

    this._appendScript()
      .then(() => {
        window.dataLayer = window.dataLayer || [];

        gtag('js', new Date());
        gtag('config', this.ua);

        return window.dataLayer;
      })
      .catch((error) => console.warn(error));
  }

  _appendScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.ua}`;
    });
  }
}
