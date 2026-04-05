import Dashboard from "@/components/dashboard/Dashboard";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Resumen | Inmo Joven",
  description: "Resumen de tu actividad y accesos rápidos en Inmo Joven.",
};
export default function page() {
  return (
    <>
      <Dashboard />
    </>
  );
}
