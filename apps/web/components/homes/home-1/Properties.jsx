"use client";
import Link from "next/link";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { properties } from "@/data/properties";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

/** @param {{ src: string; alt?: string }} p */
function ListingImage({ src, alt = "" }) {
  if (
    src?.startsWith("http://") ||
    src?.startsWith("https://") ||
    src?.startsWith("//")
  ) {
    return (
      <img
        className="lazyload"
        alt={alt}
        src={src}
        width={600}
        height={401}
        loading="lazy"
      />
    );
  }
  return (
    <Image className="lazyload" alt={alt} src={src} width={600} height={401} />
  );
}

/** @param {Record<string, unknown>} property */
function formatListingPrice(property) {
  const p = Number(property.price) || 0;
  const cur = typeof property.currency === "string" ? property.currency : "USD";
  if (cur === "USD") {
    return `US$${p.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
  }
  return `$${p.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

/** @param {Record<string, unknown>} property */
function secondaryTag(property) {
  if (typeof property.operation === "string" && property.operation.trim()) {
    return property.operation.trim();
  }
  return "For Sale";
}

/** @param {Record<string, unknown>} property */
function areaSuffix(property) {
  return String(property.sqft ?? "").includes("m²") ? null : "Sqft";
}

/**
 * @param {{ property: Record<string, unknown> }} p
 */
function ListingCard({ property }) {
  const id = String(property.id);
  const title = String(property.title ?? "");
  const location = String(property.location ?? "");
  const imageSrc = String(property.imageSrc ?? "/images/section/box-house.jpg");
  const beds = property.beds ?? 0;
  const baths = property.baths ?? 0;
  const sqft = property.sqft ?? "—";

  return (
    <div className="box-house hover-img ">
      <div className="image-wrap">
        <Link href={`/property-detail-v1/${id}`}>
          <ListingImage src={imageSrc} alt={title} />
        </Link>
        <ul className="box-tag flex gap-8 ">
          <li className="flat-tag text-4 bg-main fw-6 text_white">Featured</li>
          <li className="flat-tag text-4 bg-3 fw-6 text_white">
            {secondaryTag(property)}
          </li>
        </ul>
        <div className="list-btn flex gap-8 ">
          <a href="#" className="btn-icon save hover-tooltip">
            <i className="icon-save" />
            <span className="tooltip">Add Favorite</span>
          </a>
          <a href="#" className="btn-icon find hover-tooltip">
            <i className="icon-find-plus" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
      </div>
      <div className="content">
        <h5 className="title">
          <Link href={`/property-detail-v1/${id}`}>{title}</Link>
        </h5>
        <p className="location text-1 line-clamp-1 ">
          <i className="icon-location" /> {location}
        </p>
        <ul className="meta-list flex">
          <li className="text-1 flex">
            <span>{beds}</span>Beds
          </li>
          <li className="text-1 flex">
            <span>{baths}</span>Baths
          </li>
          <li className="text-1 flex">
            <span>{sqft}</span>
            {areaSuffix(property)}
          </li>
        </ul>
        <div className="bot flex justify-between items-center">
          <h5 className="price">{formatListingPrice(property)}</h5>
          <div className="wrap-btn flex">
            <a href="#" className="compare flex gap-8 items-center text-1">
              <i className="icon-compare" />
              Compare
            </a>
            <Link
              href={`/property-detail-v1/${id}`}
              className="tf-btn style-border pd-4"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ listings?: Record<string, unknown>[] }} p
 * `listings` definido = datos del API (puede ser array vacío). Sin prop = mock estático.
 */
export default function Properties({ listings }) {
  const items =
    listings !== undefined ? listings : /** @type {Record<string, unknown>[]} */ (properties);

  if (listings !== undefined && items.length === 0) {
    return (
      <section className="section-listing tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center ">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="Today’s Luxury Listings" />
                </h2>
                <p className="text-1 text-center">
                  No hay propiedades publicadas por ahora. Volvé a intentar más
                  tarde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-listing tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center ">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Today’s Luxury Listings" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Thousands of luxury home enthusiasts just like you visit our
                website.
              </p>
            </div>
            <div
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-767"
              data-screen={767}
              data-preview={1}
              data-space={15}
            >
              <div className="swiper-wrapper tf-layout-mobile-md md-col-2  lg-col-3 ">
                {items.map((property) => (
                  <div key={String(property.id)} className="swiper-slide">
                    <ListingCard property={property} />
                  </div>
                ))}
              </div>
              <div className="sw-pagination sw-pagination-mb-1 text-center d-lg-none d-block" />
            </div>
            <Swiper
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-767"
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd446",
              }}
              spaceBetween={15}
            >
              {items.map((property) => (
                <SwiperSlide key={String(property.id)} className="swiper-slide">
                  <ListingCard property={property} />
                </SwiperSlide>
              ))}

              <div className="sw-pagination sw-pagination-mb-1 text-center d-lg-none d-block spd446" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
