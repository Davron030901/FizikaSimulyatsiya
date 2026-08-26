import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PhysicsLab UZ — Interaktiv fizika simulyatsiyalari',
    short_name: 'PhysicsLab',
    description:
      "O'zbek tilidagi interaktiv fizika simulyatsiyalari: mexanika bo'yicha 9 bo'lim, 79 mavzu.",
    lang: 'uz',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#f8fafc',
    theme_color: '#3b82f6',
    categories: ['education', 'science'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
