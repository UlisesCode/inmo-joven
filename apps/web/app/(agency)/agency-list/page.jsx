import Agency2 from "@/components/agency/Agency2";

import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Inmobiliarias | Inmo Joven",
  description: "Listado de inmobiliarias y estudios asociados a Inmo Joven.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content tf-spacing-4">
          <Breadcumb pageName="Inmobiliarias" />
          <Agency2 />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
