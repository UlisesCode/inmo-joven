import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function apiBaseCandidates() {
  const raw = process.env.API_URL?.trim();
  if (!raw) return [];
  const base = raw.replace(/\/$/, "");
  const alt = base.includes("localhost")
    ? base.replace("localhost", "127.0.0.1")
    : base.replace("127.0.0.1", "localhost");
  return [...new Set([base, alt])];
}

/**
 * Proxy del buscador Tokko: el navegador llama a Next (mismo origen);
 * el servidor reenvía a Fastify usando API_URL del .env de la raíz.
 */
export async function GET(request) {
  const bases = apiBaseCandidates();
  if (!bases.length) {
    return NextResponse.json(
      {
        error: "missing_api_url",
        message:
          "Falta API_URL en .env (raíz del monorepo), ej. http://127.0.0.1:4000. Levantá el API: npm run dev:api",
      },
      { status: 503 },
    );
  }

  const incoming = new URL(request.url);
  const pathWithQuery = `/tokko/listings${incoming.search}`;

  let lastErr = /** @type {Error | null} */ (null);
  for (const base of bases) {
    const target = `${base}${pathWithQuery}`;
    try {
      const res = await fetch(target, {
        cache: "no-store",
        signal: AbortSignal.timeout(25_000),
      });
      const body = await res.text();
      return new NextResponse(body, {
        status: res.status,
        headers: {
          "Content-Type":
            res.headers.get("content-type") || "application/json; charset=utf-8",
        },
      });
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
    }
  }

  const msg = lastErr?.message || "fetch failed";
  const hint =
    msg === "fetch failed" || msg.includes("fetch failed")
      ? " No se pudo conectar al API. Comprobá que esté corriendo (npm run dev:api), probá API_URL=http://127.0.0.1:4000 y, si Tokko falla por certificados, TOKKO_INSECURE_TLS=1 en el .env del API."
      : "";

  return NextResponse.json(
    {
      error: "proxy_upstream",
      message: `${msg}.${hint}`,
    },
    { status: 502 },
  );
}
