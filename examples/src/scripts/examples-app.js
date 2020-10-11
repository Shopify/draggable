// eslint-disable-next-line shopify/strict-component-boundaries
import Analytics from '../components/Analytics';
// eslint-disable-next-line shopify/strict-component-boundaries
import MobileNav from '../components/MobileNav';
import Content from '../content';

// Initialize Google Analytics
const gtagTracking = new Analytics('UA-107063633-1');
gtagTracking.init();

// Initialize navigation
const mobileNav = new MobileNav(document.getElementById('MobileNavActivator'));
mobileNav.init();

// Initialize all examples
for (const Example in Content) {
  // eslint-disable-next-line no-prototype-builtins
  if (Content.hasOwnProperty(Example)) {
    Content[Example]();
  }
}
