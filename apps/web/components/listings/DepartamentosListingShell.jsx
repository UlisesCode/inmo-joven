import Breadcumb from "@/components/common/Breadcumb";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

/**
 * @param {{ breadcrumbLabel: string; children: React.ReactNode }} props
 */
export default function DepartamentosListingShell({ breadcrumbLabel, children }) {
  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName={breadcrumbLabel} />
      <div className="main-content main-content--listing-ec">{children}</div>
      <Footer1 />
    </div>
  );
}
