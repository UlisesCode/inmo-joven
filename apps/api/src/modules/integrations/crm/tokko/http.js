import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

/**
 * Cliente HTTPS opcionalmente permisivo (solo desarrollo / proxy SSL).
 * Activar con TOKKO_INSECURE_TLS=1 en .env — nunca en producción pública.
 */
function insecureAgent() {
  return new https.Agent({ rejectUnauthorized: false });
}

/**
 * @param {string} urlString
 * @param {{ method?: string; headers?: Record<string, string>; body?: string }} [opts]
 */
export function tokkoRequest(urlString, opts = {}) {
  const insecure = process.env.TOKKO_INSECURE_TLS === "1";
  const u = new URL(urlString);
  const isHttps = u.protocol === "https:";
  const lib = isHttps ? https : http;
  const agent = isHttps && insecure ? insecureAgent() : undefined;

  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        hostname: u.hostname,
        port: u.port || (isHttps ? 443 : 80),
        path: `${u.pathname}${u.search}`,
        method: opts.method || "GET",
        agent,
        headers: {
          Accept: "application/json",
          "User-Agent": "inmo-joven-api",
          ...opts.headers,
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          resolve({
            status: res.statusCode || 0,
            ok: res.statusCode != null && res.statusCode >= 200 && res.statusCode < 300,
            text,
          });
        });
      },
    );
    req.on("error", reject);
    if (opts.body != null) req.write(opts.body);
    req.end();
  });
}
