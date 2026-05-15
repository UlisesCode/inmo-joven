/**
 * Menú principal header (desktop + mobile).
 * Mono Shop: URL de tienda Mercado Libre vía NEXT_PUBLIC_MONO_SHOP_URL en Vercel.
 */

export const homes = [{ href: "/", label: "Inicio" }];

/** Misma UI que antes: un bloque con `title` + `submenu` → submenu2 en Nav. */
export const searchMonoLinks = [
  {
    title: "Buscar un mono",
    submenu: [
      { href: "/departamentos-venta", label: "Para comprar" },
      { href: "/invertir", label: "Para invertir" },
      { href: "/departamentos-alquiler", label: "Para alquilar" },
    ],
  },
];

/** Dropdown “Comunidad Monera” + landings (contenido se completa con el cliente). */
export const communityMenu = [
  {
    title: "Comunidad Monera",
    submenu: [
      { href: "/comunidad-monera", label: "La comunidad" },
      { href: "/mono-que-madruga", label: "Mono que Madruga" },
      { href: "/club-monero", label: "Club monero" },
      { href: "/seguros", label: "Seguros" },
      { href: "/faq", label: "Preguntas frecuentes" },
    ],
  },
];

const defaultMonoShop = "https://www.mercadolibre.com.ar";

export const monoShop = {
  href: process.env.NEXT_PUBLIC_MONO_SHOP_URL || defaultMonoShop,
  label: "Mono Shop",
  external: true,
};

/** Un solo ítem: link directo a Blog. */
export const blogMenu = [{ href: "/blog", label: "Blog" }];

/** @deprecated Reemplazado por searchMonoLinks + communityMenu; se mantiene export vacío por imports viejos. */
export const propertyLinks = searchMonoLinks;

/** @deprecated */
export const otherPages = communityMenu;
