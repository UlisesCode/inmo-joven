"use client";

import React, { useState } from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

/** Testimonios de ejemplo — tono cercano, barrios y situaciones creíbles en CABA/AMBA. */
const TESTIMONIALS = [
  {
    quote:
      "Nunca había alquilado sola y tenía mil dudas con la garantía y el contrato. Me explicaron todo paso a paso y el mono que vimos era tal cual en las fotos. En dos semanas ya estaba mudándome.",
    name: "Lucía Fernández",
    role: "Alquiler en Caballito",
    image: "/images/avatar/testimonials-4.jpg",
    w: 200,
    h: 200,
    rating: 5,
  },
  {
    quote:
      "Buscábamos algo chico para la primera inversión y nos cansamos de portales donde nadie te contesta. Acá las visitas se coordinaron rápido y el precio publicado coincidía con lo que hablamos después.",
    name: "Martín Ríos",
    role: "Inversor, Villa Crespo",
    image: "/images/avatar/avt-png7.png",
    w: 120,
    h: 120,
    rating: 5,
  },
  {
    quote:
      "Vivía en el interior y tenía que mudarme por laburo. Hice todo remoto: videollamada, firma y llaves sin vueltas raras. Un alivio porque venía con los nervios de punta.",
    name: "Camila Duarte",
    role: "Alquiler, Nuñez",
    image: "/images/avatar/avt-png12.png",
    w: 51,
    h: 51,
    rating: 5,
  },
  {
    quote:
      "Mi primer departamento y no sabía ni qué preguntar en la visita. El asesor fue paciente con el tema expensas y luminosidad. Hoy ya estoy viviendo ahí hace cuatro meses.",
    name: "Diego Morales",
    role: "Compra en Almagro",
    image: "/images/avatar/avt-png12.png",
    w: 51,
    h: 51,
    rating: 4,
  },
  {
    quote:
      "Lo que más valoro es que no me presionaron para cerrar. Comparé tres opciones en la misma zona y cuando dije que no, no hubo drama. Eso en otros lados no pasa.",
    name: "Paula Gómez",
    role: "Búsqueda en Palermo",
    image: "/images/avatar/avt-png6.png",
    w: 120,
    h: 120,
    rating: 5,
  },
  {
    quote:
      "Publicamos el mono de mi vieja y en menos de un mes tuvimos interesados serios. Las fotos y la descripción quedaron prolijos; nos ahorró un montón de idas y vueltas.",
    name: "Andrés Vega",
    role: "Propietario, Colegiales",
    image: "/images/avatar/avt-png5.png",
    w: 120,
    h: 120,
    rating: 5,
  },
  {
    quote:
      "Soy de Rosario y necesitaba alquilar antes de empezar la facu en CABA. Me ayudaron a filtrar por presupuesto real con expensas incluidas. La mudanza fue con fecha clara desde el día uno.",
    name: "Valentina Sosa",
    role: "Estudiante, Once",
    image: "/images/avatar/avt-png8.png",
    w: 120,
    h: 120,
    rating: 5,
  },
  {
    quote:
      "Había visto el mismo aviso en dos sitios con datos distintos. Acá el estado del depto y la orientación coincidían con lo que vimos. Esa honestidad cuenta.",
    name: "Nicolás Peralta",
    role: "Alquiler, Belgrano",
    image: "/images/avatar/avt-png5.png",
    w: 120,
    h: 120,
    rating: 4,
  },
  {
    quote:
      "Somos dos con un bebé y el tema del tamaño del mono era clave. Nos mostraron opciones con metros reales y no ‘aproximados’. Cerramos en Flores y estamos cómodos.",
    name: "Mariana y Leo Ibarra",
    role: "Familia, Flores",
    image: "/images/avatar/avt-png12.png",
    w: 51,
    h: 51,
    rating: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="ratings ">
      {Array.from({ length: 5 }, (_, i) => (
        <i
          key={i}
          className="icon-star"
          style={i < count ? undefined : { opacity: 0.22 }}
        />
      ))}
    </div>
  );
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function Testimonials() {
  const [showMore, setShowMore] = useState(false);
  const columns = chunk(TESTIMONIALS, 3);

  return (
    <div className="section-testimonials style-1 tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-48">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Lo que cuentan quienes ya dieron el paso" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Alquiler, primera compra o publicar: historias de gente común que
                pasó por lo mismo que vos.
              </p>
            </div>
            <div
              className={`tf-grid-layout md-col-3 loadmore-item-8 ${
                showMore ? "active" : ""
              } `}
            >
              {columns.map((group, gi) => (
                <div key={gi} className="box-testimonials">
                  {group.map((t, ti) => (
                    <div key={`${gi}-${ti}-${t.name}`} className="wg-testimonial style-2">
                      <Stars count={t.rating} />
                      <p className="text-1 description">{t.quote}</p>
                      <div className="author">
                        <div className="avatar">
                          <Image
                            alt={`${t.name}, testimonio`}
                            src={t.image}
                            width={t.w}
                            height={t.h}
                          />
                        </div>
                        <div className="content">
                          <h6 className="name mb-0">
                            <span className="text-reset">{t.name}</span>
                          </h6>
                          <p className="text-2 mb-0">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {showMore ? (
                ""
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMore((pre) => !pre)}
                  className="tf-btn bg-color-primary fw-7 mx-auto btn-loadmore view-more-button"
                >
                  Ver más…
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
