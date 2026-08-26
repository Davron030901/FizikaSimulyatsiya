import { ImageResponse } from 'next/og';

export const alt = 'PhysicsLab UZ — Interaktiv fizika simulyatsiyalari';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b1120 0%, #1e293b 100%)',
          color: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 30, letterSpacing: 6, color: '#94a3b8' }}>PHYSICSLAB UZ</div>
        </div>

        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          Interaktiv fizika simulyatsiyalari
        </div>

        <div style={{ marginTop: 32, fontSize: 30, color: '#94a3b8' }}>
          Mexanika · 9 bo&apos;lim · 79 mavzu
        </div>
      </div>
    ),
    size,
  );
}
