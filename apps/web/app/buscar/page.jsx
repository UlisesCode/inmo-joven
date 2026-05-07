import { redirect } from "next/navigation";

export const metadata = {
  title: "Buscar | Monoambiente",
  description: "Redirige al listado de departamentos en venta o alquiler.",
};

function isAlquilerFromParams(sp) {
  const rawTipo = typeof sp?.tipo === "string" ? sp.tipo.trim().toLowerCase() : "";
  const rawOp =
    typeof sp?.operacion === "string" ? sp.operacion.trim().toLowerCase() : "";
  const rawOperation =
    typeof sp?.operation === "string" ? sp.operation.trim().toLowerCase() : "";
  return (
    rawTipo === "alquiler" ||
    rawTipo === "rent" ||
    rawOp === "alquiler" ||
    rawOp === "rent" ||
    rawOperation === "rent" ||
    rawOperation === "alquiler"
  );
}

/**
 * Compatibilidad: /buscar?q=… → listado con búsqueda.
 * Opcional: tipo=alquiler | operacion=alquiler | operation=rent → /departamentos-alquiler
 */
export default async function BuscarPage({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q.trim() : "";
  const base = isAlquilerFromParams(sp)
    ? "/departamentos-alquiler"
    : "/departamentos-venta";
  if (q) {
    redirect(`${base}/q/${encodeURIComponent(q)}`);
  }
  redirect(base);
}
