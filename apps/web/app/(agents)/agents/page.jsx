import Agents from "@/components/agents/Agents";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Agentes | Inmo Joven",
  description: "Conocé a los agentes y asesores inmobiliarios de Inmo Joven.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="page-content">
          <Breadcumb pageName="Agentes" />
          <Agents />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
