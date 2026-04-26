import DepartamentosVentaClient from "@/components/listings/DepartamentosVentaClient";
import DepartamentosListingShell from "@/components/listings/DepartamentosListingShell";
import { Suspense } from "react";

export const metadata = {
  title: "Departamentos en alquiler | Inmo Joven",
  description:
    "Departamentos en alquiler. Listado desde Tokko con filtros y ordenamiento.",
};

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

export default function DepartamentosAlquilerPage() {
  return (
    <DepartamentosListingShell breadcrumbLabel="Departamentos en alquiler">
      <Suspense fallback={<ListingFallback />}>
        <DepartamentosVentaClient
          initialQuery=""
          apiOperation="rent"
          basePath="/departamentos-alquiler"
          listingLabel="Departamentos en alquiler"
        />
      </Suspense>
    </DepartamentosListingShell>
  );
}
