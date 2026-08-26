import { escapeHtml, toScriptJson } from '../utils/html';
import type { DemoConfig, DemoParam } from './demoConfig';
import { DEMO_SCRIPT } from './demoScript';
import { DEMO_STYLES } from './demoStyles';

export interface DemoTopicInfo {
  slug: string;
  code: string;
  titleUz: string;
  sectionTitle: string;
}

export interface RenderDemoOptions {
  topic: DemoTopicInfo;
  config: DemoConfig;
  theme: 'light' | 'dark';
}

const MATHJAX_CDN = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';

function renderControl(id: string, param: DemoParam): string {
  const label = escapeHtml(param.label);
  const unit = escapeHtml(param.unit);

  return `
      <div class="ctl">
        <div class="ctl__top">
          <label class="ctl__label" for="${id}Range">${label}</label>
          <span>
            <input
              class="ctl__field"
              id="${id}Number"
              type="number"
              inputmode="decimal"
              min="${param.min}"
              max="${param.max}"
              step="${param.step}"
              value="${param.value}"
              aria-label="${label} qiymati"
            />${unit ? `<span class="ctl__unit">${unit}</span>` : ''}
          </span>
        </div>
        <input
          id="${id}Range"
          type="range"
          min="${param.min}"
          max="${param.max}"
          step="${param.step}"
          value="${param.value}"
          aria-describedby="${id}Value"
        />
        <div class="ctl__limits">
          <span>${param.min}${unit ? ` ${unit}` : ''}</span>
          <span id="${id}Value" class="sr-only">${param.value}</span>
          <span>${param.max}${unit ? ` ${unit}` : ''}</span>
        </div>
        <div class="ctl__presets">
          <button type="button" data-preset="${id}" data-mode="min">min</button>
          <button type="button" data-preset="${id}" data-mode="mid">o‘rta</button>
          <button type="button" data-preset="${id}" data-mode="max">max</button>
        </div>
      </div>`;
}

/**
 * Builds a fully self-contained demo page.
 * MathJax is the only external dependency and it is optional: the formula falls back
 * to plain text if the CDN is unreachable.
 */
export function renderDemoSimulation({ topic, config, theme }: RenderDemoOptions): string {
  const title = escapeHtml(topic.titleUz);
  const code = escapeHtml(topic.code);
  const section = escapeHtml(topic.sectionTitle);
  const formula = escapeHtml(config.formula);

  const payload = toScriptJson({
    slug: topic.slug,
    demoType: config.demoType,
    accent: config.accent,
    paramA: config.paramA,
    paramB: config.paramB,
  });

  return `<!DOCTYPE html>
<html lang="uz"${theme === 'dark' ? ' class="dark"' : ''}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="robots" content="noindex" />
  <title>${code} · ${title}</title>
  <style>${DEMO_STYLES}
    :root { --accent: ${config.accent}; }
  </style>
  <script>
    window.MathJax = {
      tex: { inlineMath: [['\\\\(', '\\\\)']] },
      chtml: { scale: 1 },
      startup: {
        typeset: true,
        pageReady: function () {
          return MathJax.startup.defaultPageReady().then(function () {
            parent.postMessage({ type: 'sim:height', height: document.body.scrollHeight }, '*');
          });
        }
      }
    };
  </script>
  <script defer src="${MATHJAX_CDN}"></script>
</head>
<body>
  <main class="sim">
    <header class="sim__head">
      <span class="sim__code">${code}</span>
      <h1 class="sim__title">${title}</h1>
    </header>

    <div class="sim__stage">
      <canvas id="stage" role="img" aria-label="${title} demo animatsiyasi"></canvas>
      <span class="sim__badge">demo</span>
    </div>

    <div class="sim__readout">
      ${
        formula
          ? `<div class="chip chip--formula" aria-label="Mavzu formulasi">\\(${formula}\\)</div>`
          : ''
      }
      <div class="chip">
        <span class="chip__label">vaqt</span>
        <span class="chip__value" id="timeValue">0.0 s</span>
      </div>
      <div class="chip">
        <span class="chip__label">${escapeHtml(config.paramA.label)}</span>
        <span class="chip__value"><span id="paramAValue">${config.paramA.value}</span> ${escapeHtml(config.paramA.unit)}</span>
      </div>
      <div class="chip">
        <span class="chip__label">${escapeHtml(config.paramB.label)}</span>
        <span class="chip__value"><span id="paramBValue">${config.paramB.value}</span> ${escapeHtml(config.paramB.unit)}</span>
      </div>
    </div>

    <div class="sim__controls">
${renderControl('paramA', config.paramA)}
${renderControl('paramB', config.paramB)}
    </div>

    <div class="sim__actions">
      <button type="button" class="btn btn--primary" id="playBtn" aria-pressed="true">Pauza</button>
      <button type="button" class="btn" id="resetBtn">Qayta boshlash</button>
      <label class="sim__speed">
        Tezlik
        <select id="speedSelect" aria-label="Animatsiya tezligi">
          <option value="0.25">0.25×</option>
          <option value="0.5">0.5×</option>
          <option value="1" selected>1×</option>
          <option value="2">2×</option>
          <option value="4">4×</option>
        </select>
      </label>
    </div>

    <p class="sim__note">
      <strong>Demo rejim.</strong> Bu ${section} bo‘limidagi
      «${title}» mavzusi uchun vaqtinchalik namoyish. Animatsiya va grafik yuqoridagi
      parametrlarga javob beradi, lekin bu mavzuning to‘liq fizik modeli emas —
      to‘liq simulyatsiya tayyorlanmoqda.
      <br />
      <span style="opacity:.8">Klaviatura: <b>Space</b> — pauza, <b>R</b> — qayta boshlash.</span>
    </p>
  </main>

  <script>window.__SIM_CONFIG__ = ${payload};</script>
  <script>${DEMO_SCRIPT}</script>
</body>
</html>`;
}
