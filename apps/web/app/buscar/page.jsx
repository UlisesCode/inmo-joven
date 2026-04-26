import { redirect } from "next/navigation";

export const metadata = {
  title: "Buscar | Inmo Joven",
  description: "Redirige al listado de departamentos en venta.",
};

/**
 * Compatibilidad: /buscar?q=… → /departamentos-venta/q/…
 */
export default async function BuscarPage({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q.trim() : "";
  if (q) {
    redirect(`/departamentos-venta/q/${encodeURIComponent(q)}`);
  }
  redirect("/departamentos-venta");
}
