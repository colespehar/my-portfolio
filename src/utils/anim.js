export function animateCounter(el, end, duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  function step(now) {
    const p = Math.min(1, (now - startTime) / duration);
    const value = Math.floor(start + (end - start) * easeOutCubic(p));
    el.textContent = String(value);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 1);
}
