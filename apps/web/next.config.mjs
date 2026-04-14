import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Monorepo: el `.env` vive en la raíz; Next solo carga `.env*` en `apps/web/` por defecto.
// Sin esto, AUTH_SECRET / DATABASE_URL faltan y Auth.js responde "problem with the server configuration".
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, "..", "..");
dotenv.config({ path: path.join(monorepoRoot, ".env") });
dotenv.config({ path: path.join(monorepoRoot, ".env.local") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/engines",
    "@inmo-joven/database",
  ],
};

export default nextConfig;
