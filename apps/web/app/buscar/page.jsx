import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Properties5 from "@/components/properties/Properties5";
import { Suspense } from "react";

export const metadata = {
  title: "Buscar propiedades | Inmo Joven",
  description: "Encontrá propiedades en mapa y listado.",
};

export default function BuscarPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <div className="main-content">
        <Suspense fallback={<p className="text-1 tf-container py-40">Cargando…</p>}>
          <Properties5 />
        </Suspense>
      </div>
      <Footer1 />
    </div>
  );
}
