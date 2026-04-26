import { fetchFreePortals } from "../modules/integrations/crm/tokko/client.js";
import { TOKKO_DEMO_PORTAL_API_KEY } from "../modules/integrations/crm/tokko/constants.js";
import {
  tokkoObjectMatchesQuery,
  tokkoObjectToListingDto,
} from "../lib/tokko-listing-dto.js";

function portalApiKey() {
  const k = process.env.TOKKO_PORTAL_API_KEY?.trim();
  if (!k) return TOKKO_DEMO_PORTAL_API_KEY;
  const normalized = k.toLowerCase();
  const placeholder =
    normalized === "tu_key" ||
    normalized === "tokko_portal_api_key" ||
    normalized === "your_key" ||
    normalized === "changeme";
  return placeholder ? TOKKO_DEMO_PORTAL_API_KEY : k;
}

/**
 * @param {unknown} raw
 * @returns {"sale" | "rent" | null}
 */
function parseListingOperationFilter(raw) {
  if (typeof raw !== "string") return null;
  const o = raw.trim().toLowerCase();
  if (o === "sale" || o === "venta") return "sale";
  if (o === "rent" || o === "alquiler") return "rent";
  return null;
}

/**
 * @param {ReturnType<typeof tokkoObjectToListingDto>} dto
 * @param {"sale" | "rent" | null} op
 */
function listingDtoMatchesOperation(dto, op) {
  if (!op) return true;
  if (op === "sale") return dto.operation === "sale" || dto.forSale === true;
  if (op === "rent") return dto.operation === "rent";
  return true;
}

/**
 * @param {import("fastify").FastifyInstance} app
 */
export function registerTokkoListingRoutes(app) {
  app.get("/tokko/listings", async (request, reply) => {
    const limit = Math.min(Math.max(Number(request.query.limit) || 24, 1), 50);
    const qRaw = request.query.q;
    const q = typeof qRaw === "string" ? qRaw.trim() : "";
    const operationFilter = parseListingOperationFilter(
      typeof request.query.operation === "string"
        ? request.query.operation
        : "",
    );
    const skip = Math.max(Number(request.query.offset) || 0, 0);

    try {
      if (!q) {
        if (!operationFilter) {
          const data = await fetchFreePortals({
            apiKey: portalApiKey(),
            limit,
            offset: skip,
            lang: "es-AR",
          });
          const objects = (data.objects || []).filter(Boolean);
          const items = objects.map(tokkoObjectToListingDto);
          const meta = data.meta && typeof data.meta === "object" ? data.meta : {};
          const total =
            typeof meta.total_count === "number"
              ? meta.total_count
              : items.length;
          return {
            items,
            total,
            limit,
            offset: skip,
            source: "tokko",
          };
        }

        const batch = 50;
        const maxTokkoScan = 8000;
        let tokkoOff = 0;
        let tokkoScanned = 0;
        /** @type {ReturnType<typeof tokkoObjectToListingDto>[]} */
        const items = [];
        let passed = 0;

        while (items.length < limit && tokkoScanned < maxTokkoScan) {
          const data = await fetchFreePortals({
            apiKey: portalApiKey(),
            limit: batch,
            offset: tokkoOff,
            lang: "es-AR",
          });
          const objects = (data.objects || []).filter(Boolean);
          if (!objects.length) break;

          for (const raw of objects) {
            tokkoScanned += 1;
            const dto = tokkoObjectToListingDto(
              raw && typeof raw === "object"
                ? /** @type {Record<string, unknown>} */ (raw)
                : /** @type {Record<string, unknown>} */ ({}),
            );
            if (!listingDtoMatchesOperation(dto, operationFilter)) continue;
            if (passed < skip) {
              passed += 1;
              continue;
            }
            items.push(dto);
            if (items.length >= limit) break;
          }

          if (items.length >= limit) break;
          if (objects.length < batch) break;
          tokkoOff += objects.length;
        }

        const hasMore = items.length === limit;

        return {
          items,
          total: skip + items.length,
          limit,
          offset: skip,
          source: "tokko",
          operation: operationFilter,
          has_more: hasMore,
        };
      }

      const needle = q.toLowerCase();
      const batch = 50;
      const maxScan = 400;
      let tokkoOffset = Math.max(Number(request.query.offset) || 0, 0);
      /** @type {ReturnType<typeof tokkoObjectToListingDto>[]} */
      const matches = [];
      let scanned = 0;

      while (matches.length < limit && scanned < maxScan) {
        const data = await fetchFreePortals({
          apiKey: portalApiKey(),
          limit: batch,
          offset: tokkoOffset,
          lang: "es-AR",
        });
        const objects = (data.objects || []).filter(Boolean);
        if (!objects.length) break;

        for (const raw of objects) {
          scanned += 1;
          const o =
            raw && typeof raw === "object"
              ? /** @type {Record<string, unknown>} */ (raw)
              : {};
          if (!tokkoObjectMatchesQuery(o, needle)) continue;
          const dto = tokkoObjectToListingDto(o);
          if (!listingDtoMatchesOperation(dto, operationFilter)) continue;
          matches.push(dto);
          if (matches.length >= limit) break;
        }

        if (matches.length >= limit) break;
        if (objects.length < batch) break;
        tokkoOffset += batch;
      }

      return {
        items: matches,
        total: matches.length,
        limit,
        offset: 0,
        source: "tokko",
        q,
        scanned,
        truncated: scanned >= maxScan && matches.length < limit,
        ...(operationFilter ? { operation: operationFilter } : {}),
      };
    } catch (err) {
      request.log.error(err);
      return reply.status(502).send({
        error: "tokko_upstream",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  });

  app.get("/tokko/publications/:publicationId", async (request, reply) => {
    const { publicationId } = request.params;
    if (typeof publicationId !== "string" || !publicationId.trim()) {
      return reply.status(400).send({ error: "invalid_id" });
    }
    const id = decodeURIComponent(publicationId.trim());
    const key = portalApiKey();

    try {
      const byId = await fetchFreePortals({
        apiKey: key,
        publicationId: id,
        limit: 5,
        lang: "es-AR",
      });
      let raw = (byId.objects || []).filter(Boolean)[0];

      if (!raw) {
        for (let off = 0; off < 250 && !raw; off += 50) {
          const page = await fetchFreePortals({
            apiKey: key,
            limit: 50,
            offset: off,
            lang: "es-AR",
          });
          const objs = (page.objects || []).filter(Boolean);
          if (!objs.length) break;
          raw =
            objs.find((o) => {
              if (!o || typeof o !== "object") return false;
              const rec = /** @type {Record<string, unknown>} */ (o);
              return (
                String(rec.publication_id ?? "") === id ||
                String(rec.fake_publication_id ?? "") === id ||
                String(rec.reference_code ?? "") === id
              );
            }) ?? undefined;
          if (raw) break;
          if (objs.length < 50) break;
        }
      }

      if (!raw) {
        return reply.status(404).send({ error: "not_found" });
      }
      return tokkoObjectToListingDto(
        /** @type {Record<string, unknown>} */ (raw),
      );
    } catch (err) {
      request.log.error(err);
      return reply.status(502).send({
        error: "tokko_upstream",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  });
}
