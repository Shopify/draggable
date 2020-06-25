import MobileNav from '../components/MobileNav';
import Content from '../content';

// Initialize navigation
const mobileNav = new MobileNav(document.getElementById('MobileNavActivator'));
mobileNav.init();

// Initialize all examples
for (const Example in Content) {
  if (Content.hasOwnProperty(Example)) {
    Content[Example]();
  }
}
