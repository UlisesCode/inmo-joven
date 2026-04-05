import AddProperty from "@/components/dashboard/AddProperty";
import React from "react";

export const metadata = {
  title: "Publicar propiedad | Inmo Joven",
  description: "Cargá los datos de tu propiedad para publicarla en Inmo Joven.",
};
export default function page() {
  return (
    <>
      <AddProperty />
    </>
  );
}
