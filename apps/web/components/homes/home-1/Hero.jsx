"use client";
import SearchForm from "@/components/common/SearchForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Venta");
  const [heroQuery, setHeroQuery] = useState("");
  const items = ["Venta", "Alquiler"];

  const goBuscar = (e) => {
    e.preventDefault();
    const q = heroQuery.trim();
    router.push(
      q ? `/departamentos-venta/q/${encodeURIComponent(q)}` : "/departamentos-venta",
    );
  };

  return (
    <div className="page-title home01">
      <div className="tf-container ">
        <div className="row relative">
          <div className="col-12">
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
                          onClick={() => setActiveItem(item)}
                        >
                          <span className="text-value-item">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <form onSubmit={goBuscar}>
                    <fieldset>
                      <input
                        type="text"
                        placeholder="Avenida, barrio, comuna..."
                        value={heroQuery}
                        onChange={(e) => setHeroQuery(e.target.value)}
                        name="q"
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
                    <button
                      type="button"
                      className="tf-btn bg-color-primary pd-3"
                      onClick={goBuscar}
                    >
                      Buscar <i className="icon-MagnifyingGlass fw-6" />
                    </button>
                  </div>
                </div>
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
