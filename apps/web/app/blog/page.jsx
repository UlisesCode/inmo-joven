import CommunityLanding from "@/components/landings/CommunityLanding";

export const metadata = {
  title: "Blog | Monoambiente",
  description: "Notas, guías y novedades para comprar, alquilar o invertir.",
};

export default function BlogPage() {
  return (
    <CommunityLanding
      title="Blog"
      subtitle="Pronto publicamos artículos. Volvé en unos días o dejanos tu mail en el pie de página."
    />
  );
}
