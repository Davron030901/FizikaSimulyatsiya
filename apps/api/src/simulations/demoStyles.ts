/** Styles for the generated demo page. Kept as a plain string: the page is standalone. */
export const DEMO_STYLES = `
*, *::before, *::after { box-sizing: border-box; }

:root {
  --bg: #ffffff;
  --surface: #f8fafc;
  --border: #e2e8f0;
  --text: #0f172a;
  --muted: #64748b;
  --grid: rgba(15, 23, 42, 0.06);
  --accent: #3b82f6;
  --radius: 14px;
}

html.dark {
  --bg: #0b1120;
  --surface: #131c31;
  --border: #24304a;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --grid: rgba(226, 232, 240, 0.07);
}

html, body { margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}

.sim { padding: 14px; max-width: 900px; margin: 0 auto; }

.sim__head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.sim__code {
  font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  padding: 6px 9px; border-radius: 8px; color: #fff; background: var(--accent);
}
.sim__title { margin: 0; font-size: 17px; font-weight: 650; letter-spacing: -0.01em; }

.sim__stage {
  position: relative; width: 100%; height: 320px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
}
.sim__stage canvas { display: block; width: 100%; height: 100%; touch-action: none; }

.sim__badge {
  position: absolute; top: 10px; right: 10px;
  font: 500 11px/1 ui-monospace, Menlo, monospace;
  padding: 5px 8px; border-radius: 6px;
  background: var(--bg); border: 1px solid var(--border); color: var(--muted);
}

.sim__readout { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.chip {
  display: inline-flex; align-items: baseline; gap: 6px;
  padding: 8px 12px; border-radius: 10px;
  background: var(--surface); border: 1px solid var(--border);
  font-size: 13px; min-height: 38px;
}
.chip__label { color: var(--muted); font-size: 12px; }
.chip__value { font: 600 13px/1.3 ui-monospace, Menlo, monospace; color: var(--accent); }
.chip--formula { flex: 1 1 220px; justify-content: center; }

.sim__controls { display: grid; gap: 12px; margin-top: 14px; }
@media (min-width: 620px) { .sim__controls { grid-template-columns: 1fr 1fr; } }

.ctl {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 12px;
}
.ctl__top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.ctl__label { font-size: 13px; font-weight: 550; }
.ctl__field {
  width: 92px; text-align: right; padding: 6px 8px;
  border: 1px solid var(--border); border-radius: 8px;
  background: var(--bg); color: var(--text);
  font: 600 13px/1 ui-monospace, Menlo, monospace;
  min-height: 34px;
}
.ctl__field:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ctl__unit { color: var(--muted); font-size: 12px; margin-left: 4px; }

input[type="range"] {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 30px; background: transparent; margin: 0; cursor: pointer;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px; border-radius: 999px; background: var(--border);
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 26px; height: 26px; margin-top: -10px;
  border-radius: 50%; background: var(--accent);
  border: 3px solid var(--bg); box-shadow: 0 1px 4px rgba(0,0,0,.25);
}
input[type="range"]::-moz-range-track { height: 6px; border-radius: 999px; background: var(--border); }
input[type="range"]::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--accent); border: 3px solid var(--bg);
}
input[type="range"]:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

.ctl__limits {
  display: flex; justify-content: space-between; gap: 8px; margin-top: 6px;
  font: 400 11px/1 ui-monospace, Menlo, monospace; color: var(--muted);
}
.ctl__presets { display: flex; gap: 6px; margin-top: 10px; }
.ctl__presets button {
  flex: 1; min-height: 32px; padding: 0 6px;
  border: 1px solid var(--border); border-radius: 8px;
  background: var(--bg); color: var(--muted);
  font-size: 12px; cursor: pointer;
}
.ctl__presets button:hover { color: var(--text); border-color: var(--accent); }

.sim__actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 14px; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-height: 44px; padding: 0 16px;
  border: 1px solid var(--border); border-radius: 10px;
  background: var(--surface); color: var(--text);
  font-size: 14px; font-weight: 550; cursor: pointer;
  transition: border-color .15s, background .15s;
}
.btn:hover { border-color: var(--accent); }
.btn--primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sim__speed { margin-left: auto; display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); }
.sim__speed select {
  min-height: 44px; padding: 0 10px;
  border: 1px solid var(--border); border-radius: 10px;
  background: var(--surface); color: var(--text); font-size: 14px;
}

.sim__note {
  margin: 16px 0 0; padding: 11px 13px;
  border: 1px dashed var(--border); border-radius: 10px;
  background: var(--surface); color: var(--muted);
  font-size: 12.5px; line-height: 1.55;
}

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .btn, .ctl__presets button { transition: none; }
}

@media (max-width: 480px) {
  .sim { padding: 10px; }
  .sim__stage { height: 260px; }
  .sim__title { font-size: 15px; }
}
`;
