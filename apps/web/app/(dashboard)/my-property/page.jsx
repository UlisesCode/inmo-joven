import Property from "@/components/dashboard/Property";
import React from "react";

export const metadata = {
  title: "Mis propiedades | Monoambiente",
  description: "Listado de propiedades que publicaste o administrás.",
};
export default function page() {
  return (
    <>
      <Property />
    </>
  );
}
