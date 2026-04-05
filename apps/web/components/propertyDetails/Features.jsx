import React from "react";

export default function Features() {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Comodidades y características
      </div>
      <div className="wrap-feature">
        <div className="box-feature">
          <ul>
            <li className="feature-item">Detector de humo</li>
            <li className="feature-item">Detector de monóxido</li>
            <li className="feature-item">Botiquín de primeros auxilios</li>
            <li className="feature-item">Ingreso autónomo con caja de llaves</li>
            <li className="feature-item">Cámaras de seguridad</li>
          </ul>
        </div>
        <div className="box-feature">
          <ul>
            <li className="feature-item">Perchas</li>
            <li className="feature-item">Ropa de cama</li>
            <li className="feature-item">Almohadas y mantas extra</li>
            <li className="feature-item">Plancha</li>
            <li className="feature-item">TV con cable</li>
          </ul>
        </div>
        <div className="box-feature">
          <ul>
            <li className="feature-item">Heladera</li>
            <li className="feature-item">Microondas</li>
            <li className="feature-item">Lavavajillas</li>
            <li className="feature-item">Cafetera</li>
          </ul>
        </div>
      </div>
    </>
  );
}
