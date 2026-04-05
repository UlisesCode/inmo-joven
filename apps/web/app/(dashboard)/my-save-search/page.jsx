import SaveSearch from "@/components/dashboard/SaveSearch";
import React from "react";

export const metadata = {
  title: "Búsquedas guardadas | Inmo Joven",
  description: "Tus filtros y búsquedas guardadas para no perder de vista lo que buscás.",
};
export default function page() {
  return (
    <>
      <SaveSearch />
    </>
  );
}
