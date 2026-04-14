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

export const metadata = {
  title: "Inmo Joven | Tu primera experiencia inmobiliaria",
  description:
    "Plataforma inmobiliaria pensada para quienes compran, alquilan o invierten por primera vez.",
};
export default async function Home() {
  const apiPayload = await fetchPublicProperties({ limit: 12 });
  const homeListings = apiPayload?.items;

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
