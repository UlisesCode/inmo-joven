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
/** "Mi cuenta" no va aquí: es solo con sesión (dropdown en header / footer dinámico). */
export const otherPages = [{ href: "/faq", label: "Preguntas frecuentes" }];

/** Reservado para fase contenidos / comunidad. Vacío = oculta el ítem Blog en el header. */
export const blogMenu = [];
