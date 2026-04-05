"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";

export default function LoanCalculator() {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Simulador de préstamo
      </div>
      <form className="form-pre-approved" onSubmit={(e) => e.preventDefault()}>
        <div className="cols">
          <fieldset>
            <label className="text-1 fw-6 mb-12" htmlFor="amount">
              Monto total
            </label>
            <input type="number" id="amount" placeholder={1000} />
          </fieldset>
          <div className="wrap-input">
            <fieldset className="payment">
              <label className="text-1 fw-6 mb-12" htmlFor="payment">
                Anticipo
              </label>
              <input type="number" id="payment" placeholder={2000} />
            </fieldset>
            <fieldset className="percent">
              <input className="input-percent" type="text" defaultValue="20%" />
            </fieldset>
          </div>
        </div>
        <div className="cols">
          <fieldset className="interest-rate">
            <label className="text-1 fw-6 mb-12" htmlFor="interest-rate">
              Tasa de interés
            </label>
            <input type="number" id="interest-rate" placeholder={0} />
          </fieldset>
          <div className="select">
            <label className="text-1 fw-6 mb-12">
              Plazo de amortización (meses)
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
            />
          </div>
        </div>
        <div className="cols">
          <fieldset>
            <label className="text-1 fw-6 mb-12" htmlFor="tax">
              Impuestos / expensas
            </label>
            <input type="number" id="tax" placeholder="$3000" />
          </fieldset>
          <fieldset>
            <label className="text-1 fw-6 mb-12" htmlFor="insurance">
              Seguro
            </label>
            <input type="number" id="insurance" placeholder="$3000" />
          </fieldset>
        </div>
        <div className="wrap-btn flex items-center justify-between">
          <a href="#" className="tf-btn bg-color-primary pd-22 fw-7">
            Calcular <i className="icon-arrow-right-2 fw-4" />
          </a>
          <p className="text-1 mb-0 fw-5 text-color-heading">
            Cuota mensual estimada:
            <span>US$ 599,25</span>
          </p>
        </div>
      </form>
    </>
  );
}
