import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Link from "next/link";

/**
 * @param {{ title: string; subtitle?: string; children?: React.ReactNode }} p
 */
export default function CommunityLanding({ title, subtitle, children }) {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content">
          <section className="flat-section flat-section-v2 flat-blog-detail">
            <div className="tf-container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="heading-section text-center mb-40">
                    <h1 className="title">{title}</h1>
                    {subtitle ? (
                      <p className="text-1 text-muted mt-16 mb-0">{subtitle}</p>
                    ) : null}
                  </div>
                  <div className="wrap-blog-detail">
                    <div className="inner">
                      {children ?? (
                        <p className="text-1">
                          Estamos armando esta sección con el equipo. Si tenés
                          ideas o querés sumarte, escribinos desde{" "}
                          <Link href="/contact">Contacto</Link>.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer1 />
      </div>
    </>
  );
}
