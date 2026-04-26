/** Navegación MVP — sin demos multi-home ni plantillas de listado duplicadas. */

export const homes = [{ href: "/", label: "Inicio" }];

export const propertyLinks = [
  {
    title: "Propiedades",
    submenu: [
      { href: "/departamentos-venta", label: "Departamentos en venta" },
      { href: "/departamentos-alquiler", label: "Departamentos en alquiler" },
    ],
  },
];

/** MVP: pocas rutas visibles; el resto del template sigue en /app por si lo necesitás. */
export const otherPages = [
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/dashboard", label: "Mi cuenta" },
];

/** Reservado para fase contenidos / comunidad. Vacío = oculta el ítem Blog en el header. */
export const blogMenu = [];
