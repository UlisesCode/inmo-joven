import AddProperty from "@/components/dashboard/AddProperty";
import React from "react";

export const metadata = {
  title: "Publicar mi mono | Monoambiente",
  description: "Cargá los datos de tu propiedad para publicarla en Monoambiente.",
};
export default function page() {
  return (
    <>
      <AddProperty />
    </>
  );
}
