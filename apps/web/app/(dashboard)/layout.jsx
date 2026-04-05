import Sidebar from "@/components/dashboard/Sidebar";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Mi cuenta | Inmo Joven",
  description: "Panel de usuario: perfil, favoritos y propiedades en Inmo Joven.",
};
export default function page({ children }) {
  return (
    <>
      <div className="bg-dashboard">
        <div id="wrapper" className="bg-4">
          <Header1 parentClass="header dashboard" />
          <div className="page-layout">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
