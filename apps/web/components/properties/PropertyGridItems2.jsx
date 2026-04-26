import { properties11 } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * @param {{ items?: typeof properties11; emptyMessage?: string }} props
 */
export default function PropertyGridItems2({
  items = properties11,
  emptyMessage = "No hay propiedades para mostrar.",
}) {
  if (!items?.length) {
    return <p className="text-1 py-40 text-center">{emptyMessage}</p>;
  }

  return (
    <>
      {items.map((property) => {
        const remote =
          typeof property.imageSrc === "string" &&
          property.imageSrc.startsWith("http");
        return (
        <div className="box-house hover-img" key={String(property.id)}>
          <div className="image-wrap">
            <Link
              href={`/property-detail-v1/${encodeURIComponent(String(property.id))}`}
            >
              <Image
                className="lazyload"
                alt={property.title}
                src={property.imageSrc}
                width={property.imageWidth ?? 615}
                height={property.imageHeight ?? 405}
                unoptimized={remote}
              />
            </Link>
            <ul className="box-tag flex gap-8">
              {property.featured && (
                <li className="flat-tag text-4 bg-main fw-6 text_white">
                  Destacado
                </li>
              )}
              {property.forSale && (
                <li className="flat-tag text-4 bg-3 fw-6 text_white">
                  En venta
                </li>
              )}{" "}
            </ul>
            <div className="list-btn flex gap-8">
              <a href="#" className="btn-icon save hover-tooltip">
                <i className="icon-save" />
                <span className="tooltip">Guardar favorito</span>
              </a>
              <a href="#" className="btn-icon find hover-tooltip">
                <i className="icon-find-plus" />
                <span className="tooltip">Vista rápida</span>
              </a>
            </div>
          </div>
          <div className="content">
            <h5 className="title">
              <Link
                href={`/property-detail-v1/${encodeURIComponent(String(property.id))}`}
              >
                {property.title}
              </Link>{" "}
            </h5>
            <p className="location text-1 flex items-center gap-6 line-clamp-1">
              <i className="icon-location" /> {property.location}
            </p>
            <ul className="meta-list flex">
              <li className="text-1 flex">
                <span>{property.beds}</span>Dorm.
              </li>
              <li className="text-1 flex">
                <span>{property.baths}</span>Baths
              </li>
              <li className="text-1 flex">
                <span>{property.sqft}</span>
              </li>
            </ul>
            <div className="bot flex justify-between items-center">
              <h5 className="price">
                {property.currency && property.currency !== "USD"
                  ? `${property.currency} `
                  : "$"}
                {Number(property.price).toLocaleString("es-AR")}
              </h5>
              <div className="wrap-btn flex">
                <Link
                  href={`/property-detail-v1/${encodeURIComponent(String(property.id))}`}
                  className="tf-btn style-border pd-4"
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </>
  );
}
