#!/usr/bin/env node
/**
 * Herramientas de desarrollo (un solo entrypoint).
 *
 *   node scripts/inmo-cli.mjs
 *   node scripts/inmo-cli.mjs tokko-smoke [--webcontact]
 *   node scripts/inmo-cli.mjs seed-demo
 *   node scripts/inmo-cli.mjs create-user --demo
 *   node scripts/inmo-cli.mjs create-user email@x.com MiClave123 [Nombre]
 *
 * Desde la raíz:
 *   npm run inmo -- tokko-smoke
 *   npm run setup:local          (Postgres ya corriendo; ver .env.example)
 *   npm run setup:local:docker (levanta Postgres con Docker y luego setup:local)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadDatabaseEnv() {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
}

function requireDatabaseUrl() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error(
      "Falta DATABASE_URL.\n" +
        "  · Creá `inmo-joven/.env` (copiá desde .env.example)\n" +
        "  · Con Docker: npm run docker:up y la URL del example\n",
    );
    process.exit(1);
  }
}

function usage() {
  console.info(`Uso:
  npm run inmo -- <comando>     (desde la raíz)
  node scripts/inmo-cli.mjs <comando>

Comandos:
  tokko-smoke     Prueba Tokko (opcional --webcontact + TOKKO_API_KEY)
  seed-demo       Inserta 2 propiedades demo (requiere DATABASE_URL)
  create-user     Crea usuario para login (misma contraseña que /api/register)
                  --demo → demo@inmo-joven.test / DemoDemo123
                  o: create-user email password [nombre]
                  o variables: DEV_LOGIN_EMAIL, DEV_LOGIN_PASSWORD [, DEV_LOGIN_NAME]

Arranque local (tablas Prisma + usuario demo; Postgres tiene que estar arriba):
  cp .env.example .env   # DATABASE_URL + AUTH_SECRET
  npm run setup:local
  npm run dev

Si usás sólo Docker para Postgres: npm run setup:local:docker  (instalá Docker Desktop)
`);
}

async function cmdTokkoSmoke() {
  const {
    TOKKO_DEMO_PORTAL_API_KEY,
  } = await import("../src/modules/integrations/crm/tokko/constants.js");
  const {
    fetchFreePortals,
    postWebContact,
  } = await import("../src/modules/integrations/crm/tokko/client.js");

  function summarizeObjects(data) {
    const objects = data?.objects;
    if (!Array.isArray(objects)) return { count: 0, nonNull: 0 };
    const nonNull = objects.filter((o) => o != null).length;
    return { count: objects.length, nonNull };
  }

  const withWebContact = process.argv.includes("--webcontact");
  const demoKey =
    process.env.TOKKO_PORTAL_API_KEY?.trim() || TOKKO_DEMO_PORTAL_API_KEY;

  console.info("\n=== Tokko — feed publicable (freeportals) ===");
  const full = await fetchFreePortals({
    apiKey: demoKey,
    limit: 5,
    offset: 0,
  });
  console.info("meta:", full?.meta);
  console.info("objects (resumen):", summarizeObjects(full));

  console.info("\n=== Tokko — actualizados desde date_from ===");
  const updated = await fetchFreePortals({
    apiKey: demoKey,
    filter: "updated",
    dateFrom: "2015-12-31T00:00:00",
    limit: 3,
  });
  console.info("meta:", updated?.meta);
  console.info("objects (resumen):", summarizeObjects(updated));

  console.info("\n=== Tokko — eliminados desde date_from ===");
  const deleted = await fetchFreePortals({
    apiKey: demoKey,
    filter: "deleted",
    dateFrom: "2015-12-31T00:00:00",
    limit: 3,
  });
  console.info("meta:", deleted?.meta);
  console.info("objects (resumen):", summarizeObjects(deleted));

  if (!withWebContact) {
    console.info(
      "\n(Omitido webcontact. Para probar consulta al CRM: --webcontact y TOKKO_API_KEY)\n",
    );
    return;
  }

  const crmKey = process.env.TOKKO_API_KEY?.trim();
  if (!crmKey) {
    console.error(
      "Falta TOKKO_API_KEY en el entorno para POST /api/v1/webcontact/",
    );
    process.exitCode = 1;
    return;
  }

  console.info("\n=== Tokko — webcontact (POST) ===");
  const payload = {
    first_name: "Prueba",
    last_name: "InmoJoven",
    email: "prueba-inmo-joven@example.com",
    phone: "+5490000000000",
    message: "Consulta de prueba generada por apps/api/scripts/inmo-cli.mjs",
    subject: "Consulta de propiedades",
    source: "inmo-joven / smoke",
    key: crmKey,
  };
  const contact = await postWebContact(payload);
  console.info("status:", contact.status);
  console.info("body:", contact.body);
}

async function cmdSeedDemo() {
  loadDatabaseEnv();
  requireDatabaseUrl();

  const { prisma } = await import("@inmo-joven/database");
  const DEMO_PREFIX = "inmo-joven-demo";

  const existing = await prisma.property.count({
    where: { publicationId: { startsWith: DEMO_PREFIX } },
  });
  if (existing >= 2) {
    console.info(`Ya hay ${existing} propiedades demo (${DEMO_PREFIX}-*). Nada que hacer.`);
    await prisma.$disconnect();
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
      description: "Propiedad de prueba generada por inmo-cli seed-demo",
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
      description: "Propiedad de prueba generada por inmo-cli seed-demo",
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
  await prisma.$disconnect();
}

/**
 * @param {string[]} args sin flags (args[0] === "create-user")
 * @param {Set<string>} flags sin "--" (ej. demo, webcontact)
 */
async function cmdCreateUser(args, flags) {
  loadDatabaseEnv();
  requireDatabaseUrl();

  let email;
  let password;
  let name = null;

  if (flags.has("demo")) {
    email = "demo@inmo-joven.test";
    password = "DemoDemo123";
    name = "Usuario demo";
  } else if (args[1] && args[2]) {
    email = String(args[1]).trim().toLowerCase();
    password = String(args[2]);
    name = args[3] ? String(args[3]).trim() : null;
  } else {
    const e = process.env.DEV_LOGIN_EMAIL?.trim().toLowerCase();
    const p = process.env.DEV_LOGIN_PASSWORD;
    const n = process.env.DEV_LOGIN_NAME?.trim();
    if (e && p) {
      email = e;
      password = p;
      name = n || null;
    } else {
      console.error(
        "Indicá --demo, o email+password como argumentos, o DEV_LOGIN_EMAIL + DEV_LOGIN_PASSWORD en .env",
      );
      process.exit(1);
    }
  }

  if (!email || !password) {
    console.error("Email y contraseña son obligatorios.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("La contraseña debe tener al menos 8 caracteres.");
    process.exit(1);
  }

  const { default: bcrypt } = await import("bcryptjs");
  const { prisma } = await import("@inmo-joven/database");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.info(`Ya existe un usuario con email ${email}. No se modificó nada.`);
    await prisma.$disconnect();
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
    },
    select: { id: true, email: true, name: true, memberNo: true },
  });

  console.info("Usuario creado:", user);
  console.info("\nPodés iniciar sesión en el sitio con ese email y contraseña.\n");
  await prisma.$disconnect();
}

const argv = process.argv.slice(2);
const flags = new Set(
  argv.filter((a) => a.startsWith("--")).map((a) => a.replace(/^--/, "")),
);
const args = argv.filter((a) => !a.startsWith("--"));
const cmd = args[0];

async function main() {
  switch (cmd) {
    case "tokko-smoke":
      await cmdTokkoSmoke();
      break;
    case "seed-demo":
      await cmdSeedDemo();
      break;
    case "create-user":
      await cmdCreateUser(args, flags);
      break;
    default:
      usage();
      if (cmd) process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
