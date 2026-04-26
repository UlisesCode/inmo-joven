"use client";

import DepartamentoRowCard from "@/components/listings/DepartamentoRowCard";
import {
  TOKKO_LISTINGS_PAGE_SIZE,
  fetchTokkoListingsClient,
} from "@/lib/fetch-tokko-listings-client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

/**
 * @param {unknown} p
 */
function surfaceNumber(p) {
  if (!p || typeof p !== "object") return 0;
  const sqft = /** @type {{ sqft?: string }} */ (p).sqft;
  if (typeof sqft !== "string") return 0;
  const n = parseInt(sqft.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function ListingRowsSkeleton() {
  return (
    <div className="listing-ec__skeleton" aria-busy="true" aria-label="Cargando">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="listing-ec__skeleton-row">
          <div className="listing-ec__skeleton-thumb" />
          <div className="listing-ec__skeleton-body">
            <div className="listing-ec__skeleton-line listing-ec__skeleton-line--lg" />
            <div className="listing-ec__skeleton-line" />
            <div className="listing-ec__skeleton-line listing-ec__skeleton-line--sm" />
          </div>
          <div className="listing-ec__skeleton-aside">
            <div className="listing-ec__skeleton-line listing-ec__skeleton-line--price" />
            <div className="listing-ec__skeleton-btn" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Listado estilo marketplace (filas + filtros lateral).
 * @param {{
 *   initialQuery?: string;
 *   apiOperation: "sale" | "rent";
 *   basePath: string;
 *   listingLabel: string;
 * }} props
 */
export default function DepartamentosVentaClient({
  initialQuery = "",
  apiOperation,
  basePath,
  listingLabel,
}) {
  const router = useRouter();
  const qFromUrl = (initialQuery || "").trim();

  const [draft, setDraft] = useState(qFromUrl);
  const [items, setItems] = useState(/** @type {Record<string, unknown>[]} */ ([]));
  const [total, setTotal] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(/** @type {string | null} */ (null));
  const [meta, setMeta] = useState(
    /** @type {{ scanned?: number; truncated?: boolean }} */ ({}),
  );
  const [pagerUsesHasMore, setPagerUsesHasMore] = useState(false);
  const [remoteHasMore, setRemoteHasMore] = useState(false);

  const [sort, setSort] = useState(
    /** @type {"relevancia" | "precio_asc" | "precio_desc" | "m2_desc"} */ (
      "relevancia"
    ),
  );
  const [bedsFilter, setBedsFilter] = useState(/** @type {null | 1 | 2 | 3} */ (null));
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  useEffect(() => {
    setDraft(qFromUrl);
    setPageOffset(0);
  }, [qFromUrl]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTokkoListingsClient({
        q: qFromUrl,
        offset: qFromUrl ? 0 : pageOffset,
        operation: apiOperation,
      });
      setItems(Array.isArray(data.items) ? data.items : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
      setMeta({
        scanned: data.scanned,
        truncated: data.truncated,
      });
      if (typeof data.has_more === "boolean") {
        setPagerUsesHasMore(true);
        setRemoteHasMore(data.has_more);
      } else {
        setPagerUsesHasMore(false);
        setRemoteHasMore(false);
      }
    } catch (e) {
      setItems([]);
      setTotal(0);
      setError(
        e instanceof Error ? e.message : "No se pudieron cargar los avisos.",
      );
    } finally {
      setLoading(false);
    }
  }, [qFromUrl, pageOffset, apiOperation]);

  useEffect(() => {
    void load();
  }, [load]);

  const displayedItems = useMemo(() => {
    let list = items.map((x) =>
      x && typeof x === "object"
        ? /** @type {Record<string, unknown>} */ (x)
        : /** @type {Record<string, unknown>} */ ({}),
    );

    if (bedsFilter != null) {
      list = list.filter((p) => {
        const b = Number(p.beds) || 0;
        return bedsFilter === 3 ? b >= 3 : b === bedsFilter;
      });
    }
    const minN = priceMin.trim() ? Number(priceMin) : NaN;
    const maxN = priceMax.trim() ? Number(priceMax) : NaN;
    if (Number.isFinite(minN) && minN > 0) {
      list = list.filter((p) => Number(p.price) >= minN);
    }
    if (Number.isFinite(maxN) && maxN > 0) {
      list = list.filter((p) => Number(p.price) <= maxN);
    }

    const sorted = [...list];
    if (sort === "precio_asc") {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "precio_desc") {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "m2_desc") {
      sorted.sort((a, b) => surfaceNumber(b) - surfaceNumber(a));
    }

    return sorted;
  }, [items, bedsFilter, priceMin, priceMax, sort]);

  const filtersActive =
    bedsFilter != null ||
    priceMin.trim() !== "" ||
    priceMax.trim() !== "" ||
    sort !== "relevancia";

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = draft.trim();
    if (q) {
      router.push(`${basePath}/q/${encodeURIComponent(q)}`);
    } else {
      router.push(basePath);
    }
  };

  const clearSearch = () => {
    setDraft("");
    router.push(basePath);
  };

  const resetLocalFilters = () => {
    setBedsFilter(null);
    setPriceMin("");
    setPriceMax("");
    setSort("relevancia");
  };

  const showPager = !qFromUrl && !loading && !error;
  const fromIdx = items.length ? pageOffset + 1 : 0;
  const toIdx = pageOffset + items.length;
  const hasPrev = pageOffset > 0;
  const hasNext =
    showPager &&
    (pagerUsesHasMore ? remoteHasMore : toIdx < total);

  const headline = qFromUrl
    ? `${listingLabel} — «${qFromUrl}»`
    : listingLabel;

  return (
    <div className="listing-ec">
      <div className="tf-container">
        <header className="listing-ec__hero">
          <h1 className="listing-ec__h1">{headline}</h1>
          <p className="listing-ec__lead text-1">
            Publicaciones desde Tokko. Ordená y refiná precio y dormitorios sobre los
            avisos ya cargados en esta página.
          </p>
        </header>

        <div className="listing-ec__layout">
          <aside className="listing-ec__filters" aria-label="Filtros">
            <h2 className="listing-ec__filters-title">Filtrar</h2>

            <div className="listing-ec__filter-block">
              <span className="listing-ec__filter-label">Dormitorios</span>
              <div className="listing-ec__chips">
                {[
                  { v: null, l: "Todos" },
                  { v: 1, l: "1" },
                  { v: 2, l: "2" },
                  { v: 3, l: "3+" },
                ].map(({ v, l }) => (
                  <button
                    key={String(v)}
                    type="button"
                    className={`listing-ec__chip ${bedsFilter === v ? "is-active" : ""}`}
                    onClick={() => setBedsFilter(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="listing-ec__filter-block">
              <span className="listing-ec__filter-label">Precio</span>
              <div className="listing-ec__price-row">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mín."
                  min={0}
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  aria-label="Precio mínimo"
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Máx."
                  min={0}
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  aria-label="Precio máximo"
                />
              </div>
            </div>

            {filtersActive ? (
              <button
                type="button"
                className="tf-btn style-border listing-ec__reset-filters"
                onClick={resetLocalFilters}
              >
                Restablecer orden y filtros
              </button>
            ) : null}

            <p className="listing-ec__filters-note text-1">
              Precio y dormitorios filtran los avisos mostrados en esta página (sobre el
              bloque actual de Tokko).
            </p>
          </aside>

          <div className="listing-ec__results">
            <form className="listing-ec__search" onSubmit={onSearchSubmit}>
              <label className="visually-hidden" htmlFor="listing-ec-q">
                Ubicación o palabra clave
              </label>
              <div className="listing-ec__search-wrap">
                <i className="icon-MagnifyingGlass listing-ec__search-icon" aria-hidden />
                <input
                  id="listing-ec-q"
                  className="form-control listing-ec__search-input"
                  type="search"
                  placeholder="Barrio, calle, palabra clave…"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="tf-btn bg-color-primary">
                Buscar
              </button>
              {qFromUrl ? (
                <button type="button" className="tf-btn style-border" onClick={clearSearch}>
                  Ver todos
                </button>
              ) : null}
            </form>

            <div className="listing-ec__toolbar">
              <div>
                <p className="listing-ec__count fw-6">
                  {loading
                    ? "…"
                    : `${displayedItems.length} aviso${displayedItems.length === 1 ? "" : "s"}`}
                </p>
                {!loading && !error && qFromUrl && meta.scanned != null ? (
                  <p className="listing-ec__subcount text-1">
                    Búsqueda en Tokko: {meta.scanned} revisados
                    {meta.truncated ? " (límite alcanzado)" : ""}
                  </p>
                ) : null}
                {!loading && !error && !qFromUrl && (total > 0 || items.length > 0) ? (
                  <p className="listing-ec__subcount text-1">
                    Página {Math.floor(pageOffset / TOKKO_LISTINGS_PAGE_SIZE) + 1}:{" "}
                    {fromIdx}–{toIdx}
                    {pagerUsesHasMore && remoteHasMore
                      ? " · más en Tokko"
                      : total > 0
                        ? ` de ${total}`
                        : ""}
                  </p>
                ) : null}
                {!loading &&
                !error &&
                filtersActive &&
                displayedItems.length !== items.length ? (
                  <p className="listing-ec__subcount text-1">
                    {items.length} cargados · {displayedItems.length} con filtros
                    aplicados
                  </p>
                ) : null}
              </div>
              <div className="listing-ec__sort">
                <label className="listing-ec__sort-label text-1" htmlFor="listing-sort">
                  Ordenar
                </label>
                <select
                  id="listing-sort"
                  className="form-control listing-ec__sort-select"
                  value={sort}
                  onChange={(e) =>
                    setSort(
                      /** @type {"relevancia" | "precio_asc" | "precio_desc" | "m2_desc"} */ (
                        e.target.value
                      ),
                    )
                  }
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio_asc">Precio: menor</option>
                  <option value="precio_desc">Precio: mayor</option>
                  <option value="m2_desc">Superficie: mayor</option>
                </select>
              </div>
            </div>

            {loading ? <ListingRowsSkeleton /> : null}

            {error ? (
              <div className="listing-ec__alert" role="alert">
                <p className="fw-6 listing-ec__alert-title">Error al cargar</p>
                <p className="text-1">{error}</p>
                <button type="button" className="tf-btn style-border" onClick={() => void load()}>
                  Reintentar
                </button>
              </div>
            ) : null}

            {!loading && !error && displayedItems.length === 0 && items.length > 0 ? (
              <div className="listing-ec__empty">
                <p className="fw-6">Ningún aviso coincide con los filtros</p>
                <p className="text-1">Probá ampliar precio o dormitorios.</p>
                <button type="button" className="tf-btn bg-color-primary" onClick={resetLocalFilters}>
                  Quitar filtros
                </button>
              </div>
            ) : null}

            {!loading && !error && items.length === 0 ? (
              <div className="listing-ec__empty">
                <p className="fw-6">No hay publicaciones para mostrar</p>
                <p className="text-1">
                  Probá otra búsqueda o revisá que el API y Tokko estén accesibles
                  (en desarrollo: TOKKO_INSECURE_TLS=1 si falla el certificado).
                </p>
              </div>
            ) : null}

            {!loading && !error && displayedItems.length > 0 ? (
              <ul className="listing-ec__list">
                {displayedItems.map((property) => (
                  <li key={String(property.id)} className="listing-ec__list-item">
                    <DepartamentoRowCard property={property} />
                  </li>
                ))}
              </ul>
            ) : null}

            {showPager ? (
              <footer className="listing-ec__pager">
                <p className="text-1 listing-ec__pager-hint">
                  Paginación del catálogo completo en Tokko.
                </p>
                <div className="listing-ec__pager-btns">
                  <button
                    type="button"
                    className="tf-btn style-border"
                    disabled={!hasPrev}
                    onClick={() =>
                      setPageOffset((o) => Math.max(0, o - TOKKO_LISTINGS_PAGE_SIZE))
                    }
                  >
                    ← Anterior
                  </button>
                  <span className="listing-ec__pager-num fw-6">
                    {Math.floor(pageOffset / TOKKO_LISTINGS_PAGE_SIZE) + 1}
                  </span>
                  <button
                    type="button"
                    className="tf-btn style-border"
                    disabled={!hasNext}
                    onClick={() => setPageOffset((o) => o + TOKKO_LISTINGS_PAGE_SIZE)}
                  >
                    Siguiente →
                  </button>
                </div>
              </footer>
            ) : qFromUrl && !loading && !error ? (
              <p className="listing-ec__pager-hint text-1">
                Con texto de búsqueda los resultados salen del primer bloque del feed.
                Usá «Ver todos» y paginá para recorrer todo el catálogo.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
