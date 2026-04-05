import React from "react";

export default function PropertyNearby() {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Qué hay cerca
      </div>
      <p className="description text-color-default">
        Referencias de ejemplo a servicios y comercios cercanos. Los datos
        reales dependerán de la ubicación de la propiedad publicada.
      </p>
      <div className="row box-nearby">
        <div className="col-md-5">
          <ul className="box-left">
            <li className="item-nearby">
              <span className="fw-7 label text-4">Escuela:</span>
              <span>0.7 km</span>
            </li>
            <li className="item-nearby">
              <span className="fw-7 label text-4">Universidad:</span>
              <span>1.3 km</span>
            </li>
            <li className="item-nearby">
              <span className="fw-7 label text-4">Supermercado:</span>
              <span>0.6 km</span>
            </li>
            <li className="item-nearby">
              <span className="fw-7 label text-4">Mercado:</span>
              <span>1.1 km</span>
            </li>
          </ul>
        </div>
        <div className="col-md-5">
          <ul className="box-right">
            <li className="item-nearby">
              <span className="fw-7 label text-4">Hospital:</span>
              <span>0.4 km</span>
            </li>
            <li className="item-nearby">
              <span className="fw-7 label text-4">Subte / tren:</span>
              <span>1.8 km</span>
            </li>
            <li className="item-nearby">
              <span className="fw-7 label text-4">Gimnasio:</span>
              <span>1.3 km</span>
            </li>
            <li className="item-nearby">
              <span className="fw-7 label text-4">Río / costa:</span>
              <span>2.1 km</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
