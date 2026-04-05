import Favorites from "@/components/dashboard/Favorites";
import React from "react";

export const metadata = {
  title: "Favoritos | Inmo Joven",
  description: "Propiedades que guardaste para ver después.",
};
export default function page() {
  return (
    <>
      <Favorites />
    </>
  );
}
