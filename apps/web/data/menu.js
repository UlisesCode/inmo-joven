/** Navegación MVP — sin demos multi-home ni plantillas de listado duplicadas. */

export const homes = [{ href: "/", label: "Inicio" }];

export const propertyLinks = [
  {
    title: "Propiedades",
    submenu: [{ href: "/buscar", label: "Buscar (mapa)" }],
  },
];

export const otherPages = [
  {
    title: "Profesionales",
    className: "has-child",
    submenu: [
      { href: "/agents", label: "Agentes" },
      { href: "/agents-details/1", label: "Detalle agente" },
    ],
  },
  {
    title: "Inmobiliarias",
    className: "has-child",
    submenu: [
      { href: "/agency-grid", label: "Grilla" },
      { href: "/agency-list", label: "Listado" },
      { href: "/agency-details/1", label: "Detalle" },
    ],
  },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/dashboard", label: "Mi cuenta" },
];

/** Reservado para fase contenidos / comunidad. Vacío = oculta el ítem Blog en el header. */
export const blogMenu = [];
