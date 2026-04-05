import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Página no encontrada | Inmo Joven",
  description: "La página que buscás no existe o fue movida.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content ">
          <Breadcumb pageName="Página no encontrada" />
          <div className="page-content">
            <div className="tf-container tf-spacing-1 pt-0">
              <div className="error-404 text-center">
                <h1 className="mb-20 title">Ups… no encontramos esta página</h1>
                <p className="mb-40">
                  Buscamos en todos lados pero no está lo que necesitás.
                  <br />
                  Volvé al inicio y seguí navegando.
                </p>
                <Link
                  href={"/"}
                  className="tf-btn bg-color-primary rounded-4 pd-3 fw-6 mx-auto"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
          <Cta />
        </div>

        <Footer1 />
      </div>
    </>
  );
}
