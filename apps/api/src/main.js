import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Monorepo: el `.env` está en la raíz; `dotenv/config` solo mira el cwd (a veces `apps/api/`).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, "..", "..", "..");
dotenv.config({ path: path.join(monorepoRoot, ".env") });
dotenv.config({ path: path.join(monorepoRoot, ".env.local") });

import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "@inmo-joven/database";
import { registerPropertyRoutes } from "./routes/properties.js";
import { registerTokkoListingRoutes } from "./routes/tokko-listings.js";

const port = Number(process.env.API_PORT || process.env.PORT || 4000);
const webOrigin =
  process.env.WEB_ORIGIN || "http://localhost:3000";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: webOrigin.split(",").map((s) => s.trim()),
  credentials: true,
});

app.get("/health", async () => ({
  ok: true,
  service: "@inmo-joven/api",
}));

app.get("/health/db", async (request, reply) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true, database: "up" };
  } catch (err) {
    request.log.error(err);
    return reply.status(503).send({ ok: false, database: "down" });
  }
});

registerPropertyRoutes(app);
registerTokkoListingRoutes(app);

try {
  await app.listen({ port, host: "0.0.0.0" });
  app.log.info(`Listening on http://localhost:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
