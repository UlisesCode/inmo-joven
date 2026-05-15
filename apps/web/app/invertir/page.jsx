import { redirect } from "next/navigation";

/** Misma oferta que compra por ahora; URL dedicada para analytics / filtros futuros. */
export default function InvertirPage() {
  redirect("/departamentos-venta");
}
