import Review from "@/components/dashboard/Review";
import React from "react";

export const metadata = {
  title: "Reseñas | Inmo Joven",
  description: "Opiniones y comentarios sobre tu experiencia.",
};
export default function page() {
  return (
    <>
      <Review />
    </>
  );
}
