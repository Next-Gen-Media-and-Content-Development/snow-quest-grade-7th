// Snow Quest — shared decorative snowfall for all Science chapter hub pages.

// Lightweight decorative snowfall — purely visual, no dependency on the site's
// canvas engine, so it can't break if scene.js / ice-audio.js aren't present here.
(function () {
  const canvas = document.getElementById('snowCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, flakes;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function init() {
    resize();
    const count = Math.min(70, Math.floor(w / 18));
    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + .6,
      s: Math.random() * .6 + .2,
      d: Math.random() * 1 - .5
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(200,240,255,.75)';
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      f.y += f.s;
      f.x += f.d;
      if (f.y > h) { f.y = -4; f.x = Math.random() * w; }
    });
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize);
  init();
  tick();
})();
