"use client";

import { useEffect } from "react";
import "../public/main.scss";
import "odometer/themes/odometer-theme-default.css";
import "photoswipe/style.css";
import "rc-slider/assets/index.css";
import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import SettingsHandler from "@/components/common/SettingsHandler";
import Login from "@/components/modals/Login";
import Register from "@/components/modals/Register";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";

/** @param {{ children: React.ReactNode; session: import("next-auth").Session | null }} p */
export default function RootLayoutClient({ children, session }) {
  const pathname = usePathname();
  useEffect(() => {
    const bootstrap = require("bootstrap");
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) modalInstance.hide();
    });
    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) offcanvasInstance.hide();
    });
  }, [pathname]);

  useEffect(() => {
    const WOW = require("@/utlis/wow");
    const wow = new WOW.default({
      animateClass: "animated",
      offset: 100,
      mobile: true,
      live: false,
    });
    wow.init();
  }, [pathname]);

  useEffect(() => {
    const handleSticky = () => {
      const navbar = document.querySelector(".header");
      if (navbar) {
        if (window.scrollY > 120) {
          navbar.classList.add("fixed");
          navbar.classList.add("header-sticky");
        } else {
          navbar.classList.remove("fixed");
          navbar.classList.remove("header-sticky");
        }
        if (window.scrollY > 300) {
          navbar.classList.add("is-sticky");
        } else {
          navbar.classList.remove("is-sticky");
        }
      }
    };
    window.addEventListener("scroll", handleSticky);
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  return (
    <AuthSessionProvider session={session}>
      {children}
      <MobileMenu />
      <BackToTop />
      <SettingsHandler />
      <Login />
      <Register />
    </AuthSessionProvider>
  );
}
