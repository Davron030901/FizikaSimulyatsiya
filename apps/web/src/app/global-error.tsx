'use client';

/**
 * Catches errors thrown by the root layout itself. It replaces the whole document,
 * so it cannot rely on any shared layout, styling or components.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="uz">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#f8fafc',
          color: '#0f172a',
          textAlign: 'center',
          padding: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, margin: '0 0 8px' }}>Kutilmagan xatolik</h1>
          <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: 15 }}>
            Sahifani yuklab bo&apos;lmadi. Qaytadan urinib ko&apos;ring.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 44,
              padding: '0 20px',
              borderRadius: 12,
              border: 'none',
              background: '#3b82f6',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Qayta urinish
          </button>
        </div>
      </body>
    </html>
  );
}
