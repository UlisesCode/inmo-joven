import Package from "@/components/dashboard/Package";
import React from "react";

export const metadata = {
  title: "Mi plan | Monoambiente",
  description: "Información sobre tu plan o membresía en Monoambiente.",
};
export default function page() {
  return (
    <>
      <Package />
    </>
  );
}
