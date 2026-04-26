"use client";

import DropdownSelect from "@/components/common/DropdownSelect";
import MapComponent from "@/components/common/MapComponent";
import SearchForm from "@/components/common/SearchForm";
import PropertyGridItems2 from "@/components/properties/PropertyGridItems2";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 24;

async function fetchTokkoListings({ q, offset }) {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) {
    throw new Error("missing_next_public_api_url");
  }
  const u = new URL(`${base}/tokko/listings`);
  u.searchParams.set("limit", String(PAGE_SIZE));
  u.searchParams.set("offset", String(offset));
  if (q) u.searchParams.set("q", q);
  const res = await fetch(u.toString());
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export default function Properties5() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qFromUrl = useMemo(
    () => (searchParams.get("q") || "").trim(),
    [searchParams],
  );

  const [draft, setDraft] = useState(qFromUrl);
  const [items, setItems] = useState(/** @type {unknown[]} */ ([]));
  const [total, setTotal] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(/** @type {string | null} */ (null));
  const [meta, setMeta] = useState(
    /** @type {{ scanned?: number; truncated?: boolean }} */ ({}),
  );

  useEffect(() => {
    setDraft(qFromUrl);
    setPageOffset(0);
  }, [qFromUrl]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTokkoListings({
        q: qFromUrl,
        offset: qFromUrl ? 0 : pageOffset,
      });
      setItems(Array.isArray(data.items) ? data.items : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
      setMeta({
        scanned: data.scanned,
        truncated: data.truncated,
      });
    } catch (e) {
      setItems([]);
      setTotal(0);
      setError(
        e instanceof Error && e.message === "missing_next_public_api_url"
          ? "Falta NEXT_PUBLIC_API_URL en .env (misma base que el API, ej. http://localhost:4000)."
          : e instanceof Error
            ? e.message
            : "No se pudieron cargar los avisos.",
      );
    } finally {
      setLoading(false);
    }
  }, [qFromUrl, pageOffset]);

  useEffect(() => {
    void load();
  }, [load]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = draft.trim();
    const next = q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar";
    router.push(next);
  };

  const showPager = !qFromUrl && !loading && !error;
  const fromIdx = items.length ? pageOffset + 1 : 0;
  const toIdx = pageOffset + items.length;
  const hasPrev = pageOffset > 0;
  const hasNext = showPager && toIdx < total;

  return (
    <section className="section-property-map">
      <div className="wrap-map">
        <div
          id="map"
          className="row-height"
          data-map-zoom={16}
          data-map-scroll="true"
        >
          <MapComponent zoom={14} />
        </div>
      </div>
      <div className="content-right">
        <div className="wg-filter relative style-3">
          <form className="form-title style-2" onSubmit={onSearchSubmit}>
            <div className="w-226">
              <fieldset>
                <input
                  type="text"
                  placeholder="Dirección, barrio, ciudad..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  name="q"
                />
              </fieldset>
            </div>

            <DropdownSelect
              options={[
                "Estado",
                "En venta",
                "En alquiler",
                "Reservado",
              ]}
            />
            <DropdownSelect
              options={[
                "Tipo",
                "Departamento",
                "Casa",
                "PH",
                "Local / Oficina",
                "Terreno",
              ]}
            />
            <DropdownSelect
              options={[
                "Baños",
                "1",
                "2",
                "3",
                "4+",
              ]}
            />
            <DropdownSelect
              options={[
                "Dormitorios",
                "1",
                "2",
                "3",
                "4+",
              ]}
            />
            <div className="wrap-btn searchFormToggler">
              <div className="btn-filter show-form">
                <div className="icons">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 4H14"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 4H3"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12H12"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12H3"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 20H16"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20H3"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V6"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 10V14"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 18V22"
                      stroke="#F1913D"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <button type="submit" className="tf-btn bg-color-primary pd-3 pd-20">
                Buscar <i className="icon-MagnifyingGlass fw-6" />
              </button>
            </div>
          </form>
          <SearchForm parentClass="wd-search-form style-2" />
        </div>
        <div className="box-title">
          <h2>Listado de propiedades (Tokko)</h2>
          <div className="group-layout">
            <DropdownSelect
              addtionalParentClass="select-filter list-sort"
              options={["Ordenar (predeterminado)", "Más recientes", "Más antiguas"]}
            />
          </div>
        </div>
        {loading ? (
          <p className="text-1 py-20">Cargando avisos…</p>
        ) : error ? (
          <p className="text-1 py-20 text-color-danger">{error}</p>
        ) : null}
        {qFromUrl && meta.scanned != null ? (
          <p className="text-1 text-color-default mb-10">
            Texto: «{qFromUrl}». Revisados {meta.scanned} avisos en Tokko
            {meta.truncated ? " (límite de búsqueda alcanzado)" : ""}.
          </p>
        ) : null}
        <div className="tf-grid-layout-3 xxl-col-3 sm-col-2">
          <PropertyGridItems2
            items={/** @type {any} */ (items)}
            emptyMessage="Sin resultados. Probá otra palabra o dejá la búsqueda vacía."
          />
        </div>
        <div className="wrap-pagination">
          {showPager ? (
            <>
              <p className="text-1">
                Mostrando {fromIdx}-{toIdx} de {total} resultados (Tokko).
              </p>
              <ul className="wg-pagination justify-center">
                <li className={hasPrev ? "arrow" : "arrow disabled"}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (hasPrev) setPageOffset((o) => Math.max(0, o - PAGE_SIZE));
                    }}
                  >
                    <i className="icon-arrow-left" />
                  </a>
                </li>
                <li className={!hasPrev ? "active" : ""}>
                  <span className="text-1">
                    Página {Math.floor(pageOffset / PAGE_SIZE) + 1}
                  </span>
                </li>
                <li className={hasNext ? "arrow" : "arrow disabled"}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (hasNext) setPageOffset((o) => o + PAGE_SIZE);
                    }}
                  >
                    <i className="icon-arrow-right" />
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <p className="text-1">
              Con texto de búsqueda la paginación usa el bloque inicial de Tokko.
              Borrá el filtro para navegar por páginas.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
