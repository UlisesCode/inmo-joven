import Breadcumb from "@/components/common/Breadcumb";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Cta from "@/components/otherPages/faq/Cta";
import Faqs from "@/components/otherPages/faq/Faqs";

import React from "react";

export const metadata = {
  title: "Preguntas frecuentes | Inmo Joven",
  description: "Respuestas a las dudas más comunes sobre compra, alquiler e Inmo Joven.",
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <Breadcumb pageName="Preguntas frecuentes" />
        <div className="main-content tf-spacing-6 header-fixed">
          <Faqs />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
