import Agency1 from "@/components/agency/Agency1";
import Agents from "@/components/agents/Agents";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Inmobiliarias | Inmo Joven",
  description: "Explorá inmobiliarias en vista de grilla.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content tf-spacing-4">
          <Breadcumb pageName="Inmobiliarias" />
          <Agency1 />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
