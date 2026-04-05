import React from "react";

export default function Location() {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Cómo llegar
      </div>
      <iframe
        className="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105536.95382547326!2d-58.5036288!3d-34.6158238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3d05457fbb%3A0x945fdd802cb7a9b0!2sCdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="info-map">
        <ul className="box-left">
          <li>
            <span className="label fw-6">Dirección</span>
            <div className="text text-variant-1">Av. Santa Fe 2345</div>
          </li>
          <li>
            <span className="label fw-6">Ciudad</span>
            <div className="text text-variant-1">CABA</div>
          </li>
          <li>
            <span className="label fw-6">Provincia</span>
            <div className="text text-variant-1">Buenos Aires</div>
          </li>
        </ul>
        <ul className="box-right">
          <li>
            <span className="label fw-6">Código postal</span>
            <div className="text text-variant-1">C1059</div>
          </li>
          <li>
            <span className="label fw-6">Zona</span>
            <div className="text text-variant-1">Retiro</div>
          </li>
          <li>
            <span className="label fw-6">País</span>
            <div className="text text-variant-1">Argentina</div>
          </li>
        </ul>
      </div>
    </>
  );
}
