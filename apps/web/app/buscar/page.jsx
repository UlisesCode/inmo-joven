import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Properties5 from "@/components/properties/Properties5";

export const metadata = {
  title: "Buscar propiedades | Inmo Joven",
  description: "Encontrá propiedades en mapa y listado.",
};

export default function BuscarPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <div className="main-content">
        <Properties5 />
      </div>
      <Footer1 />
    </div>
  );
}
