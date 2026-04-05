import React from "react";

export default function ExtraInfo() {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Detalle de la propiedad
      </div>
      <div className="content">
        <p className="description text-1">
          Propiedad de ejemplo en Inmo Joven: luminosa, buena orientación y
          accesos a transporte. Los datos reales se mostrarán cuando la
          publicación esté conectada a tu CRM o base de datos. Consultá
          superficies, estado y documentación con el asesor.
        </p>
        <a href="#" className="tf-btn-link style-hover-rotate">
          <span>Leer más </span>
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2348_5612)">
              <path
                d="M1.66732 9.99999C1.66732 14.6024 5.39828 18.3333 10.0007 18.3333C14.603 18.3333 18.334 14.6024 18.334 9.99999C18.334 5.39762 14.603 1.66666 10.0007 1.66666C5.39828 1.66666 1.66732 5.39762 1.66732 9.99999Z"
                stroke="#F1913D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6.66666L10 13.3333"
                stroke="#F1913D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66732 10L10.0007 13.3333L13.334 10"
                stroke="#F1913D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2348_5612">
                <rect
                  width={20}
                  height={20}
                  fill="white"
                  transform="translate(20) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
      <div className="box">
        <ul>
          <li className="flex">
            <p className="fw-6">ID</p>
            <p>#1234</p>
          </li>
          <li className="flex">
            <p className="fw-6">Precio</p>
            <p>$7,500</p>
          </li>
          <li className="flex">
            <p className="fw-6">Superficie</p>
            <p>150 m²</p>
          </li>
          <li className="flex">
            <p className="fw-6">Ambientes</p>
            <p>9</p>
          </li>
          <li className="flex">
            <p className="fw-6">Baños</p>
            <p>3</p>
          </li>
        </ul>
        <ul>
          <li className="flex">
            <p className="fw-6">Dormitorios</p>
            <p>7.328</p>
          </li>
          <li className="flex">
            <p className="fw-6">Año</p>
            <p>2022</p>
          </li>
          <li className="flex">
            <p className="fw-6">Tipo</p>
            <p>Casa</p>
          </li>
          <li className="flex">
            <p className="fw-6">Estado</p>
            <p>En venta</p>
          </li>
          <li className="flex">
            <p className="fw-6">Cochera</p>
            <p>1</p>
          </li>
        </ul>
      </div>
    </>
  );
}
