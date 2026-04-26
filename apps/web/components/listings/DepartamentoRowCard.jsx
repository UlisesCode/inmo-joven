import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * @param {{ property: Record<string, unknown> }} props
 */
const FALLBACK_IMG = "/images/section/box-house.jpg";

export default function DepartamentoRowCard({ property }) {
  const id = String(property.id ?? "");
  const href = `/property-detail-v1/${encodeURIComponent(id)}`;
  const src =
    typeof property.imageSrc === "string" && property.imageSrc.trim()
      ? property.imageSrc.trim()
      : FALLBACK_IMG;
  const remote = src.startsWith("http");
  const currency = property.currency || "USD";
  const priceLabel =
    currency === "USD"
      ? `$${Number(property.price).toLocaleString("es-AR")}`
      : `${currency} ${Number(property.price).toLocaleString("es-AR")}`;

  return (
    <article className="listing-row">
      <Link href={href} className="listing-row__media">
        <Image
          className="listing-row__img"
          src={src}
          alt={String(property.title || "Departamento")}
          width={280}
          height={200}
          sizes="(max-width: 768px) 100vw, 280px"
          unoptimized={remote}
        />
        <ul className="listing-row__badges">
          {property.featured ? (
            <li className="listing-row__badge listing-row__badge--featured">Destacado</li>
          ) : null}
          <li className="listing-row__badge listing-row__badge--sale">
            {property.operation === "rent" ? "Alquiler" : "Venta"}
          </li>
        </ul>
      </Link>

      <div className="listing-row__main">
        <h2 className="listing-row__title">
          <Link href={href}>{String(property.title || "Sin título")}</Link>
        </h2>
        <p className="listing-row__loc text-1">
          <i className="icon-location" aria-hidden />
          {String(property.location || "—")}
        </p>
        <ul className="listing-row__meta text-1">
          <li>
            <span className="listing-row__meta-val">{property.beds ?? 0}</span>
            <span className="listing-row__meta-lbl">dorm.</span>
          </li>
          <li>
            <span className="listing-row__meta-val">{property.baths ?? 0}</span>
            <span className="listing-row__meta-lbl">baños</span>
          </li>
          <li>
            <span className="listing-row__meta-val">{property.sqft ?? "—"}</span>
          </li>
        </ul>
      </div>

      <div className="listing-row__cta">
        <p className="listing-row__price">{priceLabel}</p>
        <Link href={href} className="tf-btn bg-color-primary listing-row__btn">
          Ver aviso
        </Link>
      </div>
    </article>
  );
}
