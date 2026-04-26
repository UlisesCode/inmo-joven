import DepartamentosVentaClient from "@/components/listings/DepartamentosVentaClient";
import DepartamentosListingShell from "@/components/listings/DepartamentosListingShell";
import { redirect } from "next/navigation";
import { Suspense } from "react";

/**
 * URL estilo portal: /departamentos-alquiler/q/palermo
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
    title: `Departamentos en alquiler: ${q} | Inmo Joven`,
    description: `Departamentos en alquiler. Resultados para «${q}».`,
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

export default async function DepartamentosAlquilerBusquedaPage({ params }) {
  const { termino } = await params;
  const raw = termino != null ? String(termino) : "";
  let q = raw;
  try {
    q = decodeURIComponent(raw);
  } catch {
    q = raw;
  }
  if (!String(q).trim()) {
    redirect("/departamentos-alquiler");
  }
  const label =
    q.trim().length > 48
      ? `Departamentos en alquiler: ${q.trim().slice(0, 45)}…`
      : `Departamentos en alquiler: ${q}`;

  return (
    <DepartamentosListingShell breadcrumbLabel={label}>
      <Suspense fallback={<ListingFallback />}>
        <DepartamentosVentaClient
          key={q}
          initialQuery={q}
          apiOperation="rent"
          basePath="/departamentos-alquiler"
          listingLabel="Departamentos en alquiler"
        />
      </Suspense>
    </DepartamentosListingShell>
  );
}
