import { createApp } from './app';
import { allowedOrigins, API_NAME, API_VERSION, env } from './config/env';
import { disconnectPrisma } from './lib/prisma';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log('');
  console.log(`  ${API_NAME} v${API_VERSION}`);
  console.log(`  Rejim:    ${env.NODE_ENV}`);
  console.log(`  Manzil:   http://localhost:${env.PORT}`);
  console.log(`  Health:   http://localhost:${env.PORT}/api/health`);
  console.log(`  CORS:     ${allowedOrigins.join(', ')}`);
  console.log('');
});

/** Render sends SIGTERM on redeploy; finish in-flight requests before exiting. */
function shutdown(signal: string): void {
  console.log(`\n[${signal}] Server to'xtatilmoqda...`);
  server.close(async (error) => {
    if (error) {
      console.error('[shutdown] Xatolik:', error);
      process.exit(1);
    }
    await disconnectPrisma();
    console.log('[shutdown] Server va baza ulanishi toza yopildi.');
    process.exit(0);
  });

  // Force exit if connections stay open for too long.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[uncaughtException]', error);
  shutdown('uncaughtException');
});
