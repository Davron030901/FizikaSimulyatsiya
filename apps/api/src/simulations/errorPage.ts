import { escapeHtml } from '../utils/html';

/**
 * The embed endpoint renders inside an iframe, so failures must be HTML rather
 * than the JSON envelope used everywhere else.
 */
export function renderEmbedError(
  message: string,
  theme: 'light' | 'dark' = 'light',
): string {
  const dark = theme === 'dark';

  return `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Simulyatsiya yuklanmadi</title>
  <style>
    body {
      margin: 0; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: ${dark ? '#0b1120' : '#f8fafc'};
      color: ${dark ? '#94a3b8' : '#64748b'};
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      text-align: center; padding: 24px;
    }
    .box { max-width: 340px; }
    .icon { font-size: 34px; margin-bottom: 10px; }
    h1 { margin: 0 0 8px; font-size: 16px; color: ${dark ? '#e2e8f0' : '#0f172a'}; }
    p { margin: 0; font-size: 14px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="box">
    <div class="icon" aria-hidden="true">⚠️</div>
    <h1>Simulyatsiya yuklanmadi</h1>
    <p>${escapeHtml(message)}</p>
  </div>
</body>
</html>`;
}
