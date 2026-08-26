import { api } from '@/lib/api';
import { ImageResponse } from 'next/og';

export const alt = 'Simulyatsiya';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Per-topic social card. Falls back to the generic layout when the API is
 * unreachable, so a share link never renders a broken image.
 */
export default async function OgImage({ params }: { params: { topic: string } }) {
  let title = 'Fizika simulyatsiyasi';
  let sectionTitle = 'PhysicsLab UZ';
  let code = '';
  let color = '#3b82f6';

  try {
    const topic = await api.topic(params.topic);
    title = topic.titleUz;
    sectionTitle = topic.section.titleUz;
    code = topic.code;
    color = topic.section.color;
  } catch {
    /* generic card */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0b1120',
          color: '#f8fafc',
          borderTop: `16px solid ${color}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {code ? (
            <div
              style={{
                padding: '10px 20px',
                borderRadius: 14,
                background: color,
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {code}
            </div>
          ) : null}
          <div style={{ fontSize: 30, color: '#94a3b8' }}>{sectionTitle}</div>
        </div>

        <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#94a3b8' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: color }} />
          physicslab.uz
        </div>
      </div>
    ),
    size,
  );
}
