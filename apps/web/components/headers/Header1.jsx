import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import DashboardNav from "./DashboardNav";
import HeaderAuthCta from "./HeaderAuthCta";
export default function Header1({ parentClass = "header" }) {
  return (
    <header id="header-main" className={parentClass}>
      <div className="header-inner">
        <div className="tf-container xl">
          <div className="row">
            <div className="col-12">
              <div className="header-inner-wrap">
                <div className="header-logo">
                  <Link href={`/`} className="site-logo">
                    <img
                      className="logo_header"
                      alt=""
                      data-light="/images/logo/logo@2x.png"
                      data-dark="/images/logo/logo-2@2x.png"
                      src="/images/logo/logo@2x.png"
                    />
                  </Link>
                </div>
                <nav className="main-menu">
                  <ul className="navigation ">
                    <Nav />
                  </ul>
                </nav>
                <div className="header-right">
                  <DashboardNav />
                  <HeaderAuthCta />
                  <div
                    className="mobile-button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu-mobile"
                    aria-controls="menu-mobile"
                  >
                    <i className="icon-menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
