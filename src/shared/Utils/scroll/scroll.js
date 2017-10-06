let scrollAnimationFrame;

export default function scroll(element, {clientX, clientY, speed, sensitivity}) {
  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
  }

  function scrollFn() {
    const rect = element.getBoundingClientRect();
    const offsetY = (Math.abs(rect.bottom - clientY) <= sensitivity) - (Math.abs(rect.top - clientY) <= sensitivity);
    const offsetX = (Math.abs(rect.right - clientX) <= sensitivity) - (Math.abs(rect.left - clientX) <= sensitivity);
    element.scrollTop += offsetY * speed;
    element.scrollLeft += offsetX * speed;
    scrollAnimationFrame = requestAnimationFrame(scrollFn);
  }

  scrollAnimationFrame = requestAnimationFrame(scrollFn);
}
