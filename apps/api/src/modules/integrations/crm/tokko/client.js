import {
  TOKKO_FREEPORTALS_BASE,
  TOKKO_WEBCONTACT_URL,
} from "./constants.js";
import { tokkoRequest } from "./http.js";

/**
 * Arma la URL del feed de propiedades publicables (full, updated, deleted).
 * @param {object} params
 * @param {string} params.apiKey
 * @param {string} [params.lang]
 * @param {number} [params.limit]
 * @param {number} [params.offset]
 * @param {"updated"|"deleted"} [params.filter]
 * @param {string} [params.dateFrom] ISO o formato que indique Tokko (ej. 2015-12-31T00:00:00)
 * @param {number} [params.companyId]
 * @param {string} [params.publicationId]
 * @param {string} [params.country] ISO 3166-1 alpha-2
 */
export function buildFreePortalsUrl(params) {
  const u = new URL(TOKKO_FREEPORTALS_BASE);
  u.searchParams.set("api_key", params.apiKey);
  u.searchParams.set("format", "json");
  u.searchParams.set("lang", params.lang ?? "es-AR");
  if (params.limit != null) u.searchParams.set("limit", String(params.limit));
  if (params.offset != null) u.searchParams.set("offset", String(params.offset));
  if (params.filter) u.searchParams.set("filter", params.filter);
  if (params.dateFrom) u.searchParams.set("date_from", params.dateFrom);
  if (params.companyId != null)
    u.searchParams.set("company_id", String(params.companyId));
  if (params.publicationId)
    u.searchParams.set("publication_id", params.publicationId);
  if (params.country) u.searchParams.set("country", params.country);
  return u.toString();
}

export async function fetchFreePortals(params) {
  const url = buildFreePortalsUrl(params);
  const useNative = process.env.TOKKO_INSECURE_TLS !== "1";
  let status;
  let text;
  if (useNative) {
    const res = await fetch(url);
    status = res.status;
    text = await res.text();
    if (!res.ok) {
      throw new Error(`Tokko freeportals HTTP ${status}: ${text.slice(0, 800)}`);
    }
  } else {
    const res = await tokkoRequest(url, { method: "GET" });
    status = res.status;
    text = res.text;
    if (!res.ok) {
      throw new Error(`Tokko freeportals HTTP ${status}: ${text.slice(0, 800)}`);
    }
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Tokko freeportals: respuesta no JSON: ${text.slice(0, 200)}`);
  }
}

/**
 * Alta de consulta en el CRM (requiere API key real de la inmobiliaria).
 * El cuerpo debe incluir `key` con esa API key.
 * @param {Record<string, unknown>} body
 */
export async function postWebContact(body) {
  const payload = JSON.stringify(body);
  const useNative = process.env.TOKKO_INSECURE_TLS !== "1";
  let status;
  let text;
  if (useNative) {
    const res = await fetch(TOKKO_WEBCONTACT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: payload,
    });
    status = res.status;
    text = await res.text();
  } else {
    const res = await tokkoRequest(TOKKO_WEBCONTACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: payload,
    });
    status = res.status;
    text = res.text;
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status, body: json };
}
