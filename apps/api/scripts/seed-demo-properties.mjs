#!/usr/bin/env node
/**
 * Inserta 2 propiedades de demo (solo desarrollo) para probar GET /properties y el home.
 *
 *   npm run properties:seed-demo -w @inmo-joven/api
 *
 * El script npm corre antes `db:generate` en la raíz (cliente Prisma).
 * Requiere DATABASE_URL (en apps/api/.env o en la raíz del monorepo).
 *
 * Nota: Prisma se importa con import() *después* de dotenv, porque los import
 * estáticos se cargan antes y el cliente lee DATABASE_URL al inicializarse.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

if (!process.env.DATABASE_URL?.trim()) {
  console.error(
    "Falta DATABASE_URL.\n" +
      "  · Creá `inmo-joven/.env` o `apps/api/.env` (podés copiar desde .env.example)\n" +
      "  · Incluí una línea: DATABASE_URL=\"postgresql://...\"",
  );
  process.exit(1);
}

const { prisma } = await import("@inmo-joven/database");

const DEMO_PREFIX = "inmo-joven-demo";

async function main() {
  const existing = await prisma.property.count({
    where: { publicationId: { startsWith: DEMO_PREFIX } },
  });
  if (existing >= 2) {
    console.info(`Ya hay ${existing} propiedades demo (${DEMO_PREFIX}-*). Nada que hacer.`);
    return;
  }

  const rows = [
    {
      publicationId: `${DEMO_PREFIX}-1`,
      title: "Monoambiente Palermo (demo)",
      operation: "Alquiler",
      price: 450000,
      currency: "ARS",
      address: "Av. Santa Fe 4500",
      city: "CABA",
      region: "Capital Federal",
      country: "AR",
      lat: -34.58,
      lng: -58.42,
      bedrooms: 1,
      bathrooms: 1,
      areaSqm: 32,
      description: "Propiedad de prueba generada por seed-demo-properties.mjs",
      images: ["/images/section/box-house.jpg"],
    },
    {
      publicationId: `${DEMO_PREFIX}-2`,
      title: "Casa 3 dormitorios Martínez (demo)",
      operation: "Venta",
      price: 285000,
      currency: "USD",
      address: "Calle demo 123",
      city: "Martínez",
      region: "Buenos Aires",
      country: "AR",
      lat: -34.49,
      lng: -58.5,
      bedrooms: 3,
      bathrooms: 2,
      areaSqm: 180,
      description: "Propiedad de prueba generada por seed-demo-properties.mjs",
      images: ["/images/section/box-house-2.jpg"],
    },
  ];

  for (const data of rows) {
    await prisma.property.upsert({
      where: {
        publicationId_crmSource: {
          publicationId: data.publicationId,
          crmSource: "tokko",
        },
      },
      create: { ...data, crmSource: "tokko", status: "active" },
      update: {
        title: data.title,
        status: "active",
        price: data.price,
        city: data.city,
      },
    });
  }

  const total = await prisma.property.count({ where: { status: "active" } });
  console.info(`Listo. Propiedades activas en DB: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
