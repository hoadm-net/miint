import { prisma } from './client';

async function cleanup() {
  const result = await prisma.url.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  console.log(`Cleanup: removed ${result.count} expired links`);
  await prisma.$disconnect();
}

cleanup().catch((e) => {
  console.error(e);
  process.exit(1);
}); 