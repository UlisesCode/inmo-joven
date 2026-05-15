import CommunityLanding from "@/components/landings/CommunityLanding";
import Link from "next/link";

export const metadata = {
  title: "Mono que Madruga | Monoambiente",
  description: "Novedades tempraneras para moneros. Suscribite al boletín.",
};

export default function MonoQueMadrugaPage() {
  return (
    <CommunityLanding
      title="Mono que Madruga"
      subtitle="Info y beneficios para los que madrugan (contenido a completar)."
    >
      <p className="text-1 mb-24">
        Acá va el cuerpo de la landing: propuesta de valor, fotos y llamados a la
        acción que defina el cliente.
      </p>
      <Link href="/contact" className="tf-btn bg-color-primary">
        Suscribirme
      </Link>
    </CommunityLanding>
  );
}
