import MobileNav from '../components/MobileNav';
// Home page
import Home from '../content/Home';
// Draggable
import DragEvents from '../content/Draggable/DragEvents';
// import RestrictAxis from '../content/Draggable/RestrictAxis';
// Droppable
import OneAndOnly from '../content/Droppable/OneAndOnly';
// import Capacity from '../content/Droppable/Capacity';
// Sortable
import SimpleList from '../content/Sortable/SimpleList';
import Transformed from '../content/Sortable/Transformed';
import MultipleContainers from '../content/Sortable/MultipleContainers';
// Swappable
import Flexbox from '../content/Swappable/Flexbox';
import Floated from '../content/Swappable/Floated';
import GridLayout from '../content/Swappable/GridLayout';
// Plugins
import PluginsCollidable from '../content/Plugins/Collidable';
import PluginsSnappable from '../content/Plugins/Snappable';
import PluginsSwapAnimation from '../content/Plugins/SwapAnimation';

// Initialize navigation
const navActivator = document.getElementById('MobileNavActivator');

if (navActivator) {
  const mobileNav = new MobileNav(navActivator); // eslint-disable-line no-unused-vars
}

// Initialize all examples
Home();
DragEvents();
// RestrictAxis();
OneAndOnly();
// Capacity();
SimpleList();
Transformed();
MultipleContainers();
Flexbox();
Floated();
GridLayout();
PluginsCollidable();
PluginsSnappable();
PluginsSwapAnimation();
