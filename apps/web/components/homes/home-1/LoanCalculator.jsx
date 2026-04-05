"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import DropdownSelect from "@/components/common/DropdownSelect";
export default function LoanCalculator() {
  return (
    <section className="section-pre-approved tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="content">
              <div className="heading-section ">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="¿Necesitás un crédito hipotecario?" />
                  <br />
                  <SplitTextAnimation text="Simulá tu cuota" />
                </h2>
                <p className="text-1 split-text split-lines-transform">
                  Estimá montos aproximados; la oferta final depende del banco o
                  mutuo que elijas.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="form-pre-approved"
              >
                <div className="cols ">
                  <fieldset>
                    <label className=" text-1 fw-6 mb-12" htmlFor="amount">
                      Monto total
                    </label>
                    <input type="number" id="amount" placeholder={1000} />
                  </fieldset>
                  <div className="wrap-input">
                    <fieldset className="payment">
                      <label className="text-1 fw-6 mb-12" htmlFor="payment">
                        Entrega inicial
                      </label>
                      <input type="number" id="payment" placeholder={2000} />
                    </fieldset>
                    <fieldset className="percent">
                      <input
                        className="input-percent"
                        type="text"
                        defaultValue="20%"
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="cols">
                  <fieldset className="interest-rate">
                    <label className="text-1 fw-6 mb-12" htmlFor="interestRate">
                      Tasa de interés (%)
                    </label>
                    <input type="number" id="interestRate" placeholder={0} />
                  </fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      Plazo (meses)
                    </label>

                    <DropdownSelect
                      options={[
                        "Elegí el plazo",
                        "1 mes",
                        "2 meses",
                        "3 meses",
                        "4 meses",
                        "5 meses",
                      ]}
                      addtionalParentClass=""
                    />
                  </div>
                </div>
                <div className="cols">
                  <fieldset>
                    <label className=" text-1 fw-6 mb-12" htmlFor="tax">
                      Impuestos / expensas
                    </label>
                    <input type="number" id="tax" placeholder="$3000" />
                  </fieldset>
                  <fieldset>
                    <label className=" text-1 fw-6 mb-12" htmlFor="insurance">
                      Seguro del hogar
                    </label>
                    <input type="number" id="insurance" placeholder="$3000" />
                  </fieldset>
                </div>
                <p className="text-1">
                  Cuota mensual estimada: <span>8000</span>
                </p>
                <div className="wrap-btn">
                  <a href="#" className="tf-btn bg-color-primary pd-6 fw-7">
                    Calcular
                  </a>
                  <a href="#" className="tf-btn style-border pd-7 fw-7 ">
                    Limpiar
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-wrap img-animation wow animate__animated">
              <Image
                className="lazyload parallax-img"
                data-src="/images/section/section-pre-approved.jpg"
                alt=""
                src="/images/section/section-pre-approved.jpg"
                width={620}
                height={844}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
