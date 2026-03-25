#!/usr/bin/env node
/**
 * Llamadas de prueba a Tokko Broker (feed de portal + contacto web opcional).
 *
 * Uso:
 *   npm run tokko:smoke -w @inmo-joven/api
 *
 * Contacto web (API key real de inmobiliaria; crea consulta en Tokko):
 *   TOKKO_API_KEY=tu_key npm run tokko:smoke -w @inmo-joven/api -- --webcontact
 *
 * @see https://developers.tokkobroker.com/docs/property
 * @see https://developers.tokkobroker.com/docs/contactos
 */

import {
  TOKKO_DEMO_PORTAL_API_KEY,
} from "../src/modules/integrations/crm/tokko/constants.js";
import {
  fetchFreePortals,
  postWebContact,
} from "../src/modules/integrations/crm/tokko/client.js";

function summarizeObjects(data) {
  const objects = data?.objects;
  if (!Array.isArray(objects)) return { count: 0, nonNull: 0 };
  const nonNull = objects.filter((o) => o != null).length;
  return { count: objects.length, nonNull };
}

async function main() {
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
    message: "Consulta de prueba generada por apps/api/scripts/tokko-smoke.mjs",
    subject: "Consulta de propiedades",
    source: "inmo-joven / smoke",
    key: crmKey,
  };
  const contact = await postWebContact(payload);
  console.info("status:", contact.status);
  console.info("body:", contact.body);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
