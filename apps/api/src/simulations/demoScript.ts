/**
 * Client-side runtime for the generated demo page.
 * Written as a plain string with no template literals so nothing here is interpolated
 * by TypeScript. Reads window.__SIM_CONFIG__ produced by demoTemplate.ts.
 */
export const DEMO_SCRIPT = String.raw`
(function () {
  'use strict';

  var CONFIG = window.__SIM_CONFIG__;
  if (!CONFIG) return;

  var canvas = document.getElementById('stage');
  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;

  var state = {
    playing: true,
    t: 0,
    speed: 1,
    a: CONFIG.paramA.value,
    b: CONFIG.paramB.value
  };

  var series = [];
  var SERIES_SECONDS = 6;
  var rafId = null;
  var lastFrame = 0;

  // ---------- helpers ----------

  function norm(param, value) {
    var span = param.max - param.min;
    if (span === 0) return 0.5;
    return Math.min(Math.max((value - param.min) / span, 0), 1);
  }

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function fmt(value, step) {
    var decimals = 0;
    if (step < 1) decimals = Math.min(String(step).split('.')[1] ? String(step).split('.')[1].length : 2, 4);
    return value.toFixed(decimals);
  }

  function arrow(x1, y1, x2, y2, color, width) {
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    var head = Math.min(11, len * 0.32);
    var ux = dx / len, uy = dy / len;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width || 2.5;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 - ux * head * 0.8, y2 - uy * head * 0.8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * head - uy * head * 0.45, y2 - uy * head + ux * head * 0.45);
    ctx.lineTo(x2 - ux * head + uy * head * 0.45, y2 - uy * head - ux * head * 0.45);
    ctx.closePath();
    ctx.fill();
  }

  function grid(height) {
    ctx.strokeStyle = css('--grid');
    ctx.lineWidth = 1;
    var step = 32;
    ctx.beginPath();
    for (var x = step; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (var y = step; y < height; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
  }

  // ---------- demo renderers ----------
  // Each returns a signal in [-1, 1] that feeds the strip chart.

  function drawMotion(h, na, nb) {
    var pad = 26;
    var trackY = h * 0.58;
    var radius = 9 + nb * 15;
    var cycle = 0.12 + na * 0.75;
    var progress = (state.t * cycle) % 1;
    var x = pad + radius + progress * (W - 2 * pad - 2 * radius);

    ctx.strokeStyle = css('--border');
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pad, trackY + radius + 4);
    ctx.lineTo(W - pad, trackY + radius + 4);
    ctx.stroke();

    for (var i = 1; i <= 7; i++) {
      var tx = x - i * radius * 0.75;
      if (tx < pad) break;
      ctx.globalAlpha = 0.1 * (1 - i / 8);
      ctx.fillStyle = CONFIG.accent;
      ctx.beginPath();
      ctx.arc(tx, trackY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = CONFIG.accent;
    ctx.beginPath();
    ctx.arc(x, trackY, radius, 0, Math.PI * 2);
    ctx.fill();

    arrow(x + radius + 4, trackY, x + radius + 12 + na * 44, trackY, CONFIG.accent, 3);
    return progress * 2 - 1;
  }

  function drawWave(h, na, nb) {
    var mid = h * 0.5;
    var amp = h * 0.3 * (0.2 + 0.8 * na);
    var k = (Math.PI * 2 / Math.max(W, 1)) * (1 + nb * 5);
    var omega = 1.4 + nb * 5;

    ctx.strokeStyle = css('--border');
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, mid);
    ctx.lineTo(W, mid);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = CONFIG.accent;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (var x = 0; x <= W; x += 2) {
      var y = mid - amp * Math.sin(k * x - omega * state.t);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    var markerX = W * 0.22;
    var signal = Math.sin(k * markerX - omega * state.t);
    ctx.fillStyle = CONFIG.accent;
    ctx.beginPath();
    ctx.arc(markerX, mid - amp * signal, 7, 0, Math.PI * 2);
    ctx.fill();
    return signal;
  }

  function drawOrbit(h, na, nb) {
    var cx = W / 2, cy = h / 2;
    var base = Math.min(W, h);
    var r = base * 0.16 + nb * base * 0.24;
    var omega = 0.4 + na * 3.2;
    var angle = state.t * omega;
    var x = cx + Math.cos(angle) * r;
    var y = cy + Math.sin(angle) * r;

    ctx.strokeStyle = css('--border');
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = CONFIG.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle - 1.1, angle);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = css('--muted');
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();

    arrow(cx, cy, x, y, css('--muted'), 1.5);

    ctx.fillStyle = CONFIG.accent;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();

    var vlen = 22 + na * 40;
    arrow(x, y, x - Math.sin(angle) * vlen, y + Math.cos(angle) * vlen, CONFIG.accent, 2.5);
    return Math.cos(angle);
  }

  function drawVector(h, na, nb) {
    var ox = W * 0.28, oy = h * 0.68;
    var scale = Math.min(W, h) * 0.38;
    var lenA = scale * (0.25 + na * 0.75);
    var lenB = scale * (0.25 + nb * 0.75);
    var angleB = -Math.PI / 6 - Math.abs(Math.sin(state.t * 0.5)) * (Math.PI / 2.2);

    var ax = ox + lenA, ay = oy;
    var bx = ox + Math.cos(angleB) * lenB, by = oy + Math.sin(angleB) * lenB;
    var rx = ax + (bx - ox), ry = ay + (by - oy);

    ctx.strokeStyle = css('--border');
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.moveTo(ax, ay); ctx.lineTo(rx, ry);
    ctx.moveTo(bx, by); ctx.lineTo(rx, ry);
    ctx.stroke();
    ctx.setLineDash([]);

    arrow(ox, oy, ax, ay, css('--muted'), 2.5);
    arrow(ox, oy, bx, by, css('--muted'), 2.5);
    arrow(ox, oy, rx, ry, CONFIG.accent, 3.5);

    ctx.fillStyle = css('--text');
    ctx.beginPath();
    ctx.arc(ox, oy, 4, 0, Math.PI * 2);
    ctx.fill();

    var mag = Math.sqrt((rx - ox) * (rx - ox) + (ry - oy) * (ry - oy));
    return Math.min(mag / (scale * 2), 1) * 2 - 1;
  }

  function drawFluid(h, na, nb) {
    var pad = 30;
    var tankW = W - pad * 2;
    var tankH = h - pad * 1.4;
    var top = pad * 0.7;
    var level = 0.15 + na * 0.75;
    var surfaceY = top + tankH * (1 - level);

    ctx.strokeStyle = css('--border');
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pad, top);
    ctx.lineTo(pad, top + tankH);
    ctx.lineTo(pad + tankW, top + tankH);
    ctx.lineTo(pad + tankW, top);
    ctx.stroke();

    // Depth shading: deeper layers are drawn more opaque, mirroring rising pressure.
    var layers = 24;
    for (var i = 0; i < layers; i++) {
      var ly = surfaceY + ((top + tankH - surfaceY) / layers) * i;
      var lh = (top + tankH - surfaceY) / layers + 1;
      ctx.globalAlpha = 0.16 + (i / layers) * (0.3 + nb * 0.45);
      ctx.fillStyle = CONFIG.accent;
      ctx.fillRect(pad + 1.5, ly, tankW - 3, lh);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = CONFIG.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (var x = 0; x <= tankW; x += 3) {
      var wy = surfaceY + Math.sin(x * 0.05 + state.t * 2) * 3;
      if (x === 0) ctx.moveTo(pad + x, wy); else ctx.lineTo(pad + x, wy);
    }
    ctx.stroke();

    var bubbles = 6;
    for (var j = 0; j < bubbles; j++) {
      var phase = (state.t * (0.25 + nb * 0.5) + j / bubbles) % 1;
      var by = top + tankH - phase * (top + tankH - surfaceY);
      if (by < surfaceY) continue;
      var bx = pad + tankW * (0.14 + 0.72 * ((j * 0.37) % 1));
      ctx.globalAlpha = 0.5 * (1 - phase * 0.6);
      ctx.fillStyle = css('--bg');
      ctx.beginPath();
      ctx.arc(bx, by, 3 + nb * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    arrow(pad + tankW + 10, surfaceY, pad + tankW + 10, top + tankH, css('--muted'), 2);
    return level * 2 - 1;
  }

  var RENDERERS = {
    motion: drawMotion,
    wave: drawWave,
    orbit: drawOrbit,
    vector: drawVector,
    fluid: drawFluid
  };

  // ---------- strip chart ----------

  function drawChart(top, height, label) {
    ctx.fillStyle = css('--bg');
    ctx.globalAlpha = 0.55;
    ctx.fillRect(0, top, W, height);
    ctx.globalAlpha = 1;

    ctx.strokeStyle = css('--border');
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, top);
    ctx.lineTo(W, top);
    ctx.moveTo(0, top + height / 2);
    ctx.lineTo(W, top + height / 2);
    ctx.stroke();

    ctx.fillStyle = css('--muted');
    ctx.font = '11px ui-monospace, Menlo, monospace';
    ctx.fillText(label, 8, top + 14);

    if (series.length < 2) return;
    var t0 = state.t - SERIES_SECONDS;

    ctx.strokeStyle = CONFIG.accent;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    var started = false;
    for (var i = 0; i < series.length; i++) {
      var point = series[i];
      var x = ((point.t - t0) / SERIES_SECONDS) * W;
      var y = top + height / 2 - point.v * (height / 2 - 6);
      if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
    }
    ctx.stroke();
  }

  // ---------- main loop ----------

  function draw() {
    ctx.clearRect(0, 0, W, H);

    var chartH = Math.min(74, H * 0.26);
    var stageH = H - chartH;
    var na = norm(CONFIG.paramA, state.a);
    var nb = norm(CONFIG.paramB, state.b);

    grid(stageH);
    var renderer = RENDERERS[CONFIG.demoType] || drawMotion;
    var signal = renderer(stageH, na, nb);

    if (state.playing) {
      series.push({ t: state.t, v: Math.max(-1, Math.min(1, signal)) });
      while (series.length && series[0].t < state.t - SERIES_SECONDS) series.shift();
    }

    drawChart(stageH, chartH, 'vaqt bo\u2018yicha o\u2018zgarish');
    document.getElementById('timeValue').textContent = state.t.toFixed(1) + ' s';
  }

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    var dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;
    if (state.playing) state.t += dt * state.speed;
    draw();
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = rect.width;
    H = rect.height;
    draw();
  }

  // ---------- controls ----------

  function bindParam(id, param, field) {
    var range = document.getElementById(id + 'Range');
    var number = document.getElementById(id + 'Number');
    var output = document.getElementById(id + 'Value');

    function apply(value, source) {
      var next = Math.min(Math.max(Number(value), param.min), param.max);
      if (!isFinite(next)) return;
      state[field] = next;
      if (source !== 'range') range.value = String(next);
      if (source !== 'number') number.value = String(next);
      output.textContent = fmt(next, param.step);
      draw();
    }

    range.addEventListener('input', function () { apply(range.value, 'range'); });
    number.addEventListener('change', function () { apply(number.value, 'number'); });

    var presets = document.querySelectorAll('[data-preset="' + id + '"]');
    for (var i = 0; i < presets.length; i++) {
      (function (button) {
        button.addEventListener('click', function () {
          var mode = button.getAttribute('data-mode');
          var value = mode === 'min' ? param.min : mode === 'max' ? param.max : (param.min + param.max) / 2;
          apply(value, 'preset');
        });
      })(presets[i]);
    }

    apply(param.value, 'init');
  }

  function setPlaying(playing) {
    state.playing = playing;
    var button = document.getElementById('playBtn');
    button.textContent = playing ? 'Pauza' : 'Davom ettirish';
    button.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  function reset() {
    state.t = 0;
    series = [];
    draw();
  }

  bindParam('paramA', CONFIG.paramA, 'a');
  bindParam('paramB', CONFIG.paramB, 'b');

  document.getElementById('playBtn').addEventListener('click', function () {
    setPlaying(!state.playing);
  });
  document.getElementById('resetBtn').addEventListener('click', reset);
  document.getElementById('speedSelect').addEventListener('change', function (event) {
    state.speed = Number(event.target.value);
  });

  document.addEventListener('keydown', function (event) {
    var tag = (event.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select') return;
    if (event.code === 'Space') { event.preventDefault(); setPlaying(!state.playing); }
    if (event.key === 'r' || event.key === 'R') reset();
  });

  // ---------- host page integration ----------

  function reportHeight() {
    var height = Math.ceil(document.body.scrollHeight);
    parent.postMessage({ type: 'sim:height', height: height, slug: CONFIG.slug }, '*');
  }

  if (window.ResizeObserver) {
    new ResizeObserver(function () { resize(); reportHeight(); }).observe(document.body);
  } else {
    window.addEventListener('resize', function () { resize(); reportHeight(); });
  }

  window.addEventListener('load', reportHeight);
  window.addEventListener('pagehide', function () {
    if (rafId !== null) cancelAnimationFrame(rafId);
  });
  document.addEventListener('visibilitychange', function () {
    // Pause off-screen so a background tab does not burn battery.
    if (document.hidden && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && rafId === null) {
      lastFrame = performance.now();
      rafId = requestAnimationFrame(frame);
    }
  });

  resize();
  setPlaying(true);
  lastFrame = performance.now();
  rafId = requestAnimationFrame(frame);
  reportHeight();
})();
`;
