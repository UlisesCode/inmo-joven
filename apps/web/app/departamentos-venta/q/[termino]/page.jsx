import DepartamentosVentaClient from "@/components/listings/DepartamentosVentaClient";
import DepartamentosListingShell from "@/components/listings/DepartamentosListingShell";
import { redirect } from "next/navigation";
import { Suspense } from "react";

/**
 * URL estilo portal: /departamentos-venta/q/palermo (similar a …-q-… en otros sitios).
 */
export async function generateMetadata({ params }) {
  const { termino } = await params;
  const raw = termino != null ? String(termino) : "";
  let q = raw;
  try {
    q = decodeURIComponent(raw);
  } catch {
    q = raw;
  }
  return {
    title: `Departamentos en venta: ${q} | Inmo Joven`,
    description: `Departamentos en venta. Resultados para «${q}».`,
  };
}

function ListingFallback() {
  return (
    <div className="tf-container py-40">
      <div className="listing-ec-fallback" aria-busy="true">
        <div className="listing-ec-fallback__line" />
        <div className="listing-ec-fallback__line listing-ec-fallback__line--short" />
      </div>
    </div>
  );
}

export default async function DepartamentosVentaBusquedaPage({ params }) {
  const { termino } = await params;
  const raw = termino != null ? String(termino) : "";
  let q = raw;
  try {
    q = decodeURIComponent(raw);
  } catch {
    q = raw;
  }
  if (!String(q).trim()) {
    redirect("/departamentos-venta");
  }
  const label =
    q.trim().length > 48
      ? `Departamentos en venta: ${q.trim().slice(0, 45)}…`
      : `Departamentos en venta: ${q}`;

  return (
    <DepartamentosListingShell breadcrumbLabel={label}>
      <Suspense fallback={<ListingFallback />}>
        <DepartamentosVentaClient
          key={q}
          initialQuery={q}
          apiOperation="sale"
          basePath="/departamentos-venta"
          listingLabel="Departamentos en venta"
        />
      </Suspense>
    </DepartamentosListingShell>
  );
}
