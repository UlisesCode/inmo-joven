import Brands from "@/components/common/Brands";
import Cta from "@/components/common/Cta";
import About from "@/components/contact/About";
import Contact from "@/components/contact/Contact";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Contacto | Inmo Joven",
  description: "Escribinos para consultas sobre propiedades, alquileres o tu primera compra.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content">
          <Contact />
          <About />
          <Brands />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
