/**
 * Normaliza un objeto de publicación Tokko (freeportals) al formato de tarjeta del front.
 * @see https://developers.tokkobroker.com/docs/json_example
 */

/**
 * @param {unknown} obj
 * @param {string} code
 * @returns {string | null}
 */
export function getTokkoAttribute(obj, code) {
  if (!obj || typeof obj !== "object") return null;
  const attrs = /** @type {Record<string, unknown>} */ (obj).attributes;
  if (!Array.isArray(attrs)) return null;
  const needle = String(code).toLowerCase();
  const a = attrs.find(
    (x) =>
      x &&
      typeof x === "object" &&
      String(/** @type {Record<string, unknown>} */ (x).code ?? "")
        .toLowerCase() === needle,
  );
  if (!a || typeof a !== "object") return null;
  const v = /** @type {Record<string, unknown>} */ (a).value;
  if (v == null) return null;
  const s = String(v).trim();
  return s || null;
}

export function formatTokkoLocation(obj) {
  if (typeof obj.address === "string" && obj.address.trim()) {
    return obj.address.trim();
  }
  if (typeof obj.operation_full_location === "string" && obj.operation_full_location.trim()) {
    return obj.operation_full_location.trim();
  }
  if (typeof obj.operation_location === "string" && obj.operation_location.trim()) {
    return obj.operation_location.trim();
  }
  const parts = [obj.street, obj.number, obj.floor, obj.apartment]
    .filter((x) => x != null && String(x).trim())
    .map((x) => String(x).trim());
  if (parts.length) return parts.join(" ");
  return "—";
}

/**
 * @param {Record<string, unknown>} obj
 */
function pickPrimaryImageUrl(obj) {
  const imgs = obj.images;
  if (Array.isArray(imgs) && imgs.length) {
    const first = imgs[0];
    if (first && typeof first === "object") {
      const u = /** @type {Record<string, unknown>} */ (first).url;
      if (typeof u === "string" && u.trim()) return u.trim();
    }
  }
  const photos = obj.photos;
  if (Array.isArray(photos) && photos.length) {
    const p = photos[0];
    if (p && typeof p === "object") {
      const r = /** @type {Record<string, unknown>} */ (p);
      const u = r.image ?? r.original ?? r.url;
      if (typeof u === "string" && u.trim()) return u.trim();
    }
  }
  return "/images/section/box-house.jpg";
}

/**
 * Formato "documentación" (operations[]) vs freeportals actual (operation_type, operation_amount, photos[]).
 * @param {Record<string, unknown>} obj
 * @returns {"rent" | "sale"}
 */
function inferTokkoOperationKind(obj) {
  const ops = obj.operations;
  if (Array.isArray(ops) && ops.length) {
    const t = Number(/** @type {Record<string, unknown>} */ (ops[0]).type);
    if (t === 3) return "rent";
    if (Number.isFinite(t) && t !== 0) return "sale";
  }
  if (typeof obj.operation_type === "string" && obj.operation_type.trim()) {
    const s = obj.operation_type.toLowerCase();
    if (s.includes("alquil")) return "rent";
    if (s.includes("venta")) return "sale";
  }
  const oid = obj.operation_type_id;
  if (oid != null) {
    const n = Number(oid);
    if (n === 1) return "sale";
    if (Number.isFinite(n) && n > 1) return "rent";
  }
  return "sale";
}

/**
 * @param {Record<string, unknown>} obj
 */
function pickPriceAndOperation(obj) {
  const ops = obj.operations;
  if (Array.isArray(ops) && ops.length) {
    const firstOp = /** @type {Record<string, unknown>} */ (ops[0]);
    const prices = firstOp.prices;
    let price = 0;
    let currency = "USD";
    if (Array.isArray(prices) && prices.length) {
      const list = prices.map((p) =>
        p && typeof p === "object" ? /** @type {Record<string, unknown>} */ (p) : {},
      );
      const usd = list.find((p) => p.currency === "USD");
      const pick = usd || list[0];
      price = Number(pick.price) || 0;
      if (typeof pick.currency === "string" && pick.currency.trim()) {
        currency = pick.currency.trim();
      }
    }
    const web = obj.web_price;
    if (price === 0 && web != null && Number(web) > 0) {
      price = Number(web);
    }
    const type = Number(firstOp.type);
    const op = type === 3 ? "rent" : "sale";
    return { price, currency, operation: op };
  }

  let price = 0;
  if (obj.operation_amount != null && !Number.isNaN(Number(obj.operation_amount))) {
    price = Math.abs(Number(obj.operation_amount)) || 0;
  }
  const web = obj.web_price;
  if (price === 0 && web != null && Number(web) > 0) {
    price = Number(web);
  }

  let currency = "USD";
  if (typeof obj.operation_currency === "string" && obj.operation_currency.trim()) {
    currency = obj.operation_currency.trim();
  } else if (
    typeof obj.operation_currency_description === "string" &&
    obj.operation_currency_description.trim()
  ) {
    currency = obj.operation_currency_description.trim();
  }

  return { price, currency, operation: inferTokkoOperationKind(obj) };
}

/**
 * @param {Record<string, unknown>} obj
 */
function pickTokkoId(obj) {
  const candidates = [
    obj.publication_id,
    obj.fake_publication_id,
    obj.id,
    obj.reference_code,
  ];
  for (const c of candidates) {
    if (c != null && String(c).trim()) return String(c).trim();
  }
  return `tokko-${JSON.stringify(obj).slice(0, 40)}`;
}

/**
 * @param {unknown} raw
 */
export function tokkoObjectToListingDto(raw) {
  const obj =
    raw && typeof raw === "object"
      ? /** @type {Record<string, unknown>} */ (raw)
      : /** @type {Record<string, unknown>} */ ({});

  const { price, currency, operation } = pickPriceAndOperation(obj);
  const beds = Number(
    getTokkoAttribute(obj, "room_amount") ??
      obj.room_amount ??
      getTokkoAttribute(obj, "ambientes") ??
      0,
  );
  const baths = Number(
    getTokkoAttribute(obj, "bathroom_amount") ?? obj.bathroom_amount ?? 0,
  );
  const surface =
    getTokkoAttribute(obj, "surface") ??
    getTokkoAttribute(obj, "roofed_surface") ??
    obj.total_surface ??
    obj.roofed_surface ??
    obj.surface ??
    null;
  const sqft =
    surface != null && String(surface).trim() ? `${String(surface).trim()} m²` : "—";

  const title = String(
    obj.publication_title || obj.title || obj.description || "Sin título",
  ).slice(0, 220);

  const lat =
    obj.geo_lat != null && !Number.isNaN(Number(obj.geo_lat))
      ? Number(obj.geo_lat)
      : null;
  const lng =
    obj.geo_long != null && !Number.isNaN(Number(obj.geo_long))
      ? Number(obj.geo_long)
      : null;

  return {
    id: pickTokkoId(obj),
    title,
    location: formatTokkoLocation(obj),
    beds: Number.isFinite(beds) ? beds : 0,
    baths: Number.isFinite(baths) ? baths : 0,
    sqft,
    price,
    currency,
    operation,
    imageSrc: pickPrimaryImageUrl(obj),
    forSale: operation !== "rent",
    featured: false,
    imageWidth: 615,
    imageHeight: 405,
    lat,
    lng,
    description:
      typeof obj.description === "string" ? obj.description.slice(0, 4000) : "",
  };
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} needle lowercased
 */
export function tokkoObjectMatchesQuery(obj, needle) {
  if (!needle) return true;
  const blobs = [
    obj.publication_title,
    obj.title,
    obj.description,
    obj.address,
    obj.street,
    obj.operation_full_location,
    obj.operation_location,
    obj.reference_code,
    obj.publication_id,
  ]
    .filter((x) => typeof x === "string" && x.trim())
    .join(" ")
    .toLowerCase();
  if (blobs.includes(needle)) return true;
  const attrs = obj.attributes;
  if (Array.isArray(attrs)) {
    for (const a of attrs) {
      if (!a || typeof a !== "object") continue;
      const o = /** @type {Record<string, unknown>} */ (a);
      const v = o.value != null ? String(o.value).toLowerCase() : "";
      const c = o.code != null ? String(o.code).toLowerCase() : "";
      if (v.includes(needle) || c.includes(needle)) return true;
    }
  }
  return false;
}
