import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Categories from "@/components/common/Categories";
import Cities from "@/components/homes/home-1/Cities";
import HelpCenter from "@/components/homes/home-1/HelpCenter";
import Hero from "@/components/homes/home-1/Hero";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";
import Partners from "@/components/homes/home-1/Partners";
import Properties from "@/components/homes/home-1/Properties";
import Properties2 from "@/components/homes/home-1/Properties2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import { fetchPublicProperties } from "@/lib/server-properties";
import { fetchTokkoHomeListings } from "@/lib/server-tokko-listings";

/** Tokko primero; el resto se completa con `/properties` sin repetir `id`. */
const HOME_LISTINGS_MAX = 12;
const HOME_TOKKO_PREFETCH = 8;

export const metadata = {
  title: "Monoambiente | Tu primera experiencia inmobiliaria",
  description:
    "Plataforma inmobiliaria pensada para quienes compran, alquilan o invierten por primera vez.",
};
export default async function Home() {
  const [tokkoPayload, apiPayload] = await Promise.all([
    fetchTokkoHomeListings({ limit: HOME_TOKKO_PREFETCH }),
    fetchPublicProperties({ limit: HOME_LISTINGS_MAX }),
  ]);

  const tokkoRaw = Array.isArray(tokkoPayload?.items) ? tokkoPayload.items : [];
  const publicRaw = Array.isArray(apiPayload?.items) ? apiPayload.items : [];

  const tokkoSorted = [...tokkoRaw].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured),
  );

  const seen = new Set(tokkoSorted.map((x) => String(x.id)));
  const merged = [...tokkoSorted];
  for (const row of publicRaw) {
    if (merged.length >= HOME_LISTINGS_MAX) break;
    const id = String(row.id);
    if (seen.has(id)) continue;
    seen.add(id);
    merged.push(row);
  }

  const homeListings =
    merged.length > 0 ? merged.slice(0, HOME_LISTINGS_MAX) : undefined;

  return (
    <>
      <Header1 />
      <Hero />
      <div className="main-content ">
        <Categories />
        <Properties
          {...(homeListings !== undefined ? { listings: homeListings } : {})}
        />
        <HelpCenter />
        <LoanCalculator />
        <Cities />
        <Properties2 />
        <Partners />
        <Testimonials />
      </div>
      <Footer1 />
    </>
  );
}
