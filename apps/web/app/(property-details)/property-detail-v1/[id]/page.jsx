import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Details1 from "@/components/propertyDetails/Details1";
import RelatedProperties from "@/components/propertyDetails/RelatedProperties";
import Slider1 from "@/components/propertyDetails/sliders/Slider1";
import { allProperties } from "@/data/properties";
import { fetchTokkoPublication } from "@/lib/server-tokko";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Detalle de propiedad | Inmo Joven",
  description: "Información de la propiedad.",
};
export default async function page({ params }) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(String(rawId));

  let property = allProperties.find((elm) => String(elm.id) === String(id));
  if (!property) {
    const tokko = await fetchTokkoPublication(id);
    if (tokko) {
      property = {
        ...tokko,
        long:
          tokko.lng != null && !Number.isNaN(Number(tokko.lng))
            ? Number(tokko.lng)
            : tokko.long,
      };
    }
  }
  if (!property) {
    notFound();
  }

  return (
    <>
      <div id="wrapper">
        <Header1 />
        <Breadcumb pageName="Detalle de propiedad" />
        <div className="main-content">
          <Slider1 />
          <Details1 property={property} />
          <RelatedProperties />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
