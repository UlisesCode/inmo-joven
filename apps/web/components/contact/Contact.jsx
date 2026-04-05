"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";
import MapComponent from "../common/MapComponent";

export default function Contact() {
  return (
    <section className="section-top-map style-2">
      <div className="wrap-map">
        <div
          id="map"
          className="row-height"
          data-map-zoom={16}
          data-map-scroll="true"
        >
          <MapComponent />
        </div>
      </div>
      <div className="box">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <form
                id="contactform"
                onSubmit={(e) => e.preventDefault()}
                className="form-contact"
              >
                <div className="heading-section">
                  <h2 className="title">Queremos conocerte</h2>
                  <p className="text-1">
                    Contanos qué buscás: compra, alquiler o inversión. Te
                    acompañamos en cada paso.
                  </p>
                </div>
                <div className="cols">
                  <fieldset>
                    <label htmlFor="name">Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tu nombre"
                      name="name"
                      id="name"
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="email">Correo:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="tu@email.com"
                      name="email"
                      id="email-contact"
                      required
                    />
                  </fieldset>
                </div>
                <div className="cols">
                  <fieldset className="phone">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tu número de contacto"
                      name="phone"
                      id="phone"
                      required
                    />
                  </fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      ¿Qué te interesa?
                    </label>

                    <DropdownSelect
                      options={[
                        "Elegí una opción",
                        "Ubicación / zona",
                        "Alquiler",
                        "Compra",
                      ]}
                      addtionalParentClass=""
                    />
                  </div>
                </div>
                <fieldset>
                  <label htmlFor="message">Tu mensaje:</label>
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Escribí tu consulta"
                    id="message"
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="send-wrap">
                  <button
                    className="tf-btn bg-color-primary fw-7 pd-8"
                    type="submit"
                  >
                    Enviar consulta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
