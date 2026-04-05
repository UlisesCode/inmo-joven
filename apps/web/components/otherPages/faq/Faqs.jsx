import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Faqs() {
  return (
    <section className="section-faq">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="heading-section mb-48">
              <h2 className="title">Preguntas frecuentes</h2>
            </div>
            <div className="tf-faq mb-49">
              <h3 className="fw-8 title mb-24">Resumen</h3>
              <ul className="box-faq" id="wrapper-faq">
                <li className="faq-item">
                  <a
                    href="#accordion-faq-one"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-one"
                  >
                    ¿Por qué elegir Inmo Joven?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-one"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Porque reunimos búsqueda, información y contacto con el
                      equipo en un solo lugar, con foco en tu primera experiencia
                      de alquiler o compra y recursos para que tomes decisiones con
                      más tranquilidad.
                    </p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a
                    href="#accordion-faq-two"
                    className="faq-header h6"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-two"
                  >
                    ¿Para quién está pensado Inmo Joven?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-two"
                    className="collapse show"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Para quienes recién empiezan en el mercado inmobiliario:
                      estudiantes, jóvenes profesionales, familias que buscan
                      mudarse o quienes quieren invertir con información clara y
                      sin tecnicismos de más.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion-faq-three"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-three"
                  >
                    ¿Qué tan seguros están mis datos?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-three"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Trabajamos con buenas prácticas de seguridad y cifrado en
                      tránsito. Tus datos se usan solo para prestar el servicio y
                      según nuestra política de privacidad; podés consultar por
                      acceso o rectificación escribiendo al equipo.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion-faq-four"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-four"
                  >
                    ¿Hay soporte o asesoramiento humano?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-four"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Sí. Podés escribirnos por el formulario de contacto, correo
                      o los canales que figuren en el sitio; en horario hábil te
                      responde una persona del equipo de Inmo Joven.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion-faq-five"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-five"
                  >
                    ¿Cómo actualizo los datos de mi cuenta?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-five"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Iniciá sesión, entrá a Mi perfil o al panel de usuario y
                      editá los campos permitidos (nombre, correo, etc.). Guardá
                      los cambios antes de salir; si algo no se puede modificar
                      online, pedinos ayuda por contacto.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tf-faq mb-49">
              <h3 className="fw-8 title mb-24">Costos y pagos</h3>
              <ul className="box-faq" id="wrapper-faq-2">
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-one"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-one"
                  >
                    ¿Cómo se calculan honorarios o comisiones?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-one"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Dependen del tipo de servicio (publicación, plan o
                      intermediación). Te enviamos el detalle por escrito antes de
                      contratar; no hay sorpresas fuera de lo acordado en el
                      presupuesto o contrato.
                    </p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a
                    href="#accordion2-faq-two"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-two"
                  >
                    ¿Cómo pago facturas o publicaciones?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-two"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Las formas de pago disponibles (transferencia, tarjeta u
                      otras) se confirman al contratar el plan o servicio. Si
                      necesitás factura o comprobante, indicalo al momento del
                      pago o por correo.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-three"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-three"
                  >
                    ¿Hay descuentos o promociones?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-three"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Cuando haya campañas activas, las publicamos en el sitio o
                      por los canales oficiales. Escribinos para saber si hay
                      promociones vigentes para tu caso.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-four"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-four"
                  >
                    ¿Existen cargos que no figuren en la tabla de precios?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-four"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      No cobramos conceptos que no estén informados en el precio
                      del plan o en el presupuesto que aceptes. Siempre revisá el
                      detalle del contrato o la factura antes de pagar.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-five"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-five"
                  >
                    ¿Cuál es el procedimiento de reintegro o devolución?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-five"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Las devoluciones o reintegros se rigen por los términos del
                      servicio contratado y la normativa aplicable. Iniciá el
                      trámite por contacto indicando número de operación o factura.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-six"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-six"
                  >
                    ¿Ofrecen apoyo financiero o contable?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-six"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      No somos estudio contable ni asesor financiero regulado.
                      Podemos orientarte en el uso de la plataforma y, si aplica,
                      sugerirte consultar a un profesional independiente. La
                      decisión financiera es siempre tuya.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tf-faq">
              <h3 className="fw-8 title mb-24">Seguridad</h3>
              <ul className="box-faq" id="wrapper-faq-3">
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-one"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-one"
                  >
                    ¿En qué idiomas atienden?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-one"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Atendemos principalmente en español. Si necesitás otro idioma
                      para un caso puntual, consultanos y vemos cómo ayudarte.
                    </p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a
                    href="#accordion3-faq-two"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-two"
                  >
                    ¿Puedo integrar Inmo Joven con otros sistemas?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-two"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Evaluamos integraciones según volumen y necesidad. Escribinos
                      describiendo tu CRM u otro sistema y te contamos viabilidad y
                      próximos pasos.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-three"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-three"
                  >
                    ¿Qué medidas de seguridad tiene la plataforma?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-three"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Usamos hosting seguro, actualizaciones, control de acceso y
                      monitoreo. Ante incidentes relevantes seguimos un protocolo
                      interno y comunicamos lo necesario según corresponda.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-four"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-four"
                  >
                    ¿Cómo sugiero una mejora o función nueva?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-four"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Tu feedback nos ayuda a mejorar. Enviá la propuesta por
                      contacto o correo con asunto &quot;Sugerencia&quot; y el
                      equipo la revisa en la planificación de producto.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-five"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-five"
                  >
                    ¿Mis datos personales están protegidos?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-five"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Tratamos los datos personales de forma confidencial y solo
                      para fines del servicio, de acuerdo con la ley de protección
                      de datos aplicable y nuestras políticas publicadas.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-six"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-six"
                  >
                    ¿Cómo reporto un problema técnico?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-six"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Escribinos a soporte con captura de pantalla, navegador y
                      pasos para reproducir el error. Priorizamos fallos que
                      afecten a muchos usuarios o impidan usar el sitio.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="tf-sidebar sticky-sidebar">
              <form className="form-contact-seller mb-30">
                <h4 className="heading-title mb-30">Contactá al equipo</h4>
                <div className="seller-info">
                  <div className="avartar">
                    <Image
                      alt=""
                      width={200}
                      height={200}
                      src="/images/avatar/seller.jpg"
                    />
                  </div>
                  <div className="content">
                    <h6 className="name">Equipo Inmo Joven</h6>
                    <ul className="contact">
                      <li>
                        <i className="icon-phone-1" />
                        <span>+54 11 1234-5678</span>
                      </li>
                      <li>
                        <i className="icon-mail" />
                        <a href="#">hola@inmojoven.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <fieldset className="mb-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre completo"
                    name="name"
                    id="name"
                    required=""
                  />
                </fieldset>
                <fieldset className="mb-30">
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="¿En qué podemos ayudarte?"
                    id="message"
                    required=""
                    defaultValue={""}
                  />
                </fieldset>
                <a href="#" className="tf-btn bg-color-primary w-full">
                  Enviar mensaje
                </a>
              </form>
              <div className="sidebar-ads">
                <div className="image-wrap">
                  <Image
                    className="lazyload"
                    data-src="/images/blog/ads.jpg"
                    alt=""
                    width={400}
                    height={470}
                    src="/images/blog/ads.jpg"
                  />
                </div>
                <div className="logo relative z-5">
                  <Image
                    alt=""
                    width={272}
                    height={85}
                    src="/images/logo/logo-2@2x.png"
                  />
                </div>
                <div className="box-ads relative z-5">
                  <div className="content">
                    <h4 className="title">
                      <Link href={`/property-detail-v1`}>
                        Te ayudamos a encontrar un asesor inmobiliario
                      </Link>
                    </h4>
                    <div className="text-addres">
                      <p>
                        Conectate con un profesional que conozca la zona, ya sea
                        para comprar o para vender.
                      </p>
                    </div>
                  </div>
                  <a href="#" className="tf-btn fw-6 bg-color-primary w-full">
                    Hablar con un asesor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
