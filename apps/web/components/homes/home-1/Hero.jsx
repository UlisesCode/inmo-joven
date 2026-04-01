"use client";
import SearchForm from "@/components/common/SearchForm";
import Cursor from "@/components/common/Cursor";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { mainSlidesData, paginationSlidesData } from "@/data/heroSlides";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default function Hero() {
  // State to track the active item
  const [activeItem, setActiveItem] = useState("Venta");

  // Array of items to render
  const items = ["Venta", "Alquiler"];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="page-title home01">
      <div className="tf-container ">
        <div className="row justify-center relative">
          <div className="col-lg-8 ">
            <div className="content-inner">
              <div className="heading-title">
                <h1 className="title">Buscá tu mono ambiente</h1>
                <p className="h6 fw-4">
                 Encontrá tu mono ambiente con Inmo Joven 
                </p>
              </div>
              <div className="wg-filter">
                <div className="form-title">
                  <div className="tf-dropdown-sort " data-bs-toggle="dropdown">
                    <div className="btn-select">
                      <span className="text-sort-value">{activeItem}</span>
                      <i className="icon-CaretDown" />
                    </div>
                    <div className="dropdown-menu">
                      {items.map((item) => (
                        <div
                          key={item}
                          className={`select-item ${
                            activeItem === item ? "active" : ""
                          }`}
                          onClick={() => setActiveItem(item)} // Set the active item on click
                        >
                          <span className="text-value-item">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <fieldset>
                      <input
                        type="text"
                        placeholder="Avenida, barrio, comuna..."
                      />
                    </fieldset>
                  </form>
                  <div className="box-item wrap-btn">
                    <div className="btn-filter show-form searchFormToggler">
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
                    <a href="#" className="tf-btn bg-color-primary pd-3">
                      Search <i className="icon-MagnifyingGlass fw-6" />
                    </a>
                  </div>
                </div>
                <SearchForm />
              </div>
            </div>
          </div>
          <div className="col-lg-4 md-hide">
            <div className="area-cursor-custom">
              <Cursor />
              <Swiper
                modules={[Thumbs]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                spaceBetween={12}
                className="thumbs-main"
              >
                {mainSlidesData.map((slide, i) => (
                  <SwiperSlide key={i}>
                    <div className="image-wrap">
                      <Image
                        className="lazyload"
                        data-src={slide.image.dataSrc ?? slide.image.src}
                        alt={slide.image.alt}
                        src={slide.image.src}
                        width={slide.image.width}
                        height={slide.image.height}
                        sizes="(max-width: 991px) 100vw, 33vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                slidesPerView={3}
                spaceBetween={12}
                freeMode
                className="mt-3"
              >
                {paginationSlidesData.map((slide, i) => (
                  <SwiperSlide key={i} style={{ width: "auto" }}>
                    <div className="img-thumb-pagi">
                      <Image
                        className="lazyload"
                        alt={slide.image.alt}
                        src={slide.image.src}
                        width={slide.image.width}
                        height={slide.image.height}
                        sizes="120px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
