"use client";
import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="tf-sidebar sticky-sidebar">
      <form
        className="form-contact-seller mb-30"
        onSubmit={(e) => e.preventDefault()}
      >
        <h4 className="heading-title mb-30">Contactar al vendedor</h4>
        <div className="seller-info">
          <div className="avartar">
            <Image
              alt=""
              src="/images/avatar/seller.jpg"
              width={200}
              height={200}
            />
          </div>
          <div className="content">
            <h6 className="name">Shara Conner</h6>
            <ul className="contact">
              <li>
                <i className="icon-phone-1" />
                <span>+54 11 1234-5678</span>
              </li>
              <li>
                <i className="icon-mail" />
                <a href="#">hola@inmojoven.com</a>
              </li>
            </ul>
          </div>
        </div>
        <fieldset className="mb-12">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre completo"
            name="name"
            id="name1"
            required
          />
        </fieldset>
        <fieldset className="mb-30">
          <textarea
            name="message"
            cols={30}
            rows={10}
            placeholder="¿En qué podemos ayudarte?"
            id="message1"
            required
            defaultValue={""}
          />
        </fieldset>
        <a href="#" className="tf-btn bg-color-primary w-full">
          Enviar mensaje
        </a>
      </form>
      <div className="sidebar-ads mb-30">
        <div className="image-wrap">
          <Image
            className="lazyload"
            data-src="/images/blog/ads.jpg"
            alt=""
            src="/images/blog/ads.jpg"
            width={400}
            height={470}
          />
        </div>
        <div className="logo relative z-5">
          <Image
            alt=""
            src="/images/logo/logo-2@2x.png"
            width={272}
            height={85}
          />
        </div>
        <div className="box-ads relative z-5">
          <div className="content">
            <h4 className="title">
              <a href="#">Te conectamos con un asesor inmobiliario</a>
            </h4>
            <div className="text-addres">
              <p>
                Un profesional que conoce la zona puede ayudarte a comprar o
                vender con más claridad.
              </p>
            </div>
          </div>
          <a href="#" className="tf-btn fw-6 bg-color-primary fw-6 w-full">
            Hablar con un asesor
          </a>
        </div>
      </div>
      <form className="form-contact-agent" onSubmit={(e) => e.preventDefault()}>
        <h4 className="heading-title mb-30">Más sobre esta propiedad</h4>
        <fieldset>
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            name="name"
            id="name2"
            required
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            className="form-control"
            placeholder="Correo electrónico"
            name="email"
            id="email2"
            required
          />
        </fieldset>
        <fieldset className="phone">
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            name="phone"
            id="phone"
            required
          />
        </fieldset>
        <fieldset>
          <textarea
            name="message"
            cols={30}
            rows={10}
            placeholder="Mensaje"
            id="message3"
            required
            defaultValue={""}
          />
        </fieldset>
        <div className="wrap-btn">
          <a href="#" className="tf-btn bg-color-primary fw-6 w-full">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.125 5.625V14.375C18.125 14.8723 17.9275 15.3492 17.5758 15.7008C17.2242 16.0525 16.7473 16.25 16.25 16.25H3.75C3.25272 16.25 2.77581 16.0525 2.42417 15.7008C2.07254 15.3492 1.875 14.8723 1.875 14.375V5.625M18.125 5.625C18.125 5.12772 17.9275 4.65081 17.5758 4.29917C17.2242 3.94754 16.7473 3.75 16.25 3.75H3.75C3.25272 3.75 2.77581 3.94754 2.42417 4.29917C2.07254 4.65081 1.875 5.12772 1.875 5.625M18.125 5.625V5.8275C18.125 6.14762 18.0431 6.46242 17.887 6.74191C17.7309 7.0214 17.5059 7.25628 17.2333 7.42417L10.9833 11.27C10.6877 11.4521 10.3472 11.5485 10 11.5485C9.65275 11.5485 9.31233 11.4521 9.01667 11.27L2.76667 7.425C2.4941 7.25711 2.26906 7.02224 2.11297 6.74275C1.95689 6.46325 1.87496 6.14845 1.875 5.82833V5.625"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Enviar al agente
          </a>
        </div>
      </form>
    </div>
  );
}
