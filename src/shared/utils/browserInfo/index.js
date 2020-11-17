function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return Boolean(navigator.userAgent.match(pattern));
  }
  return false;
}

const browserInfo = {
  IE11OrLess: userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
};

export default browserInfo;
