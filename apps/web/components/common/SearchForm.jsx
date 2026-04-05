"use client";

import { useEffect, useRef, useState } from "react";
import DropdownSelect from "./DropdownSelect";
import Slider from "rc-slider";

export default function SearchForm({ parentClass = "wd-search-form" }) {
  const searchFormRef = useRef();
  const [priceRange, setPriceRange] = useState([100, 700]);
  const [sizeRange, setSizeRange] = useState([200, 820]);
  useEffect(() => {
    const searchFormToggler = document.querySelector(".searchFormToggler");

    const handleToggle = () => {
      searchFormRef.current.classList.toggle("show");
    };

    if (searchFormToggler) {
      searchFormToggler.addEventListener("click", handleToggle);
    }

    return () => {
      if (searchFormToggler) {
        searchFormToggler.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  return (
    <div className={parentClass} ref={searchFormRef}>
      <div className="group-price">
        <div className="widget-price">
          <div className="box-title-price">
            <span className="title-price">Rango de precio</span>
            <div className="caption-price">
              <span>desde</span>{" "}
              <span className="value fw-6" id="slider-range-value1">
                ${priceRange[0].toLocaleString()}
              </span>{" "}
              <span>hasta</span>
              <span className="value fw-6" id="slider-range-value2">
                {" "}
                ${priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
          <Slider
            range
            max={1000}
            min={0}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>
        <div className="widget-price">
          <div className="box-title-price">
            <span className="title-price">Superficie (m²)</span>
            <div className="caption-price">
              <span>desde</span>{" "}
              <span className="value fw-6" id="slider-range-value01">
                {sizeRange[0]}
              </span>{" "}
              <span>hasta</span>{" "}
              <span className="value fw-6" id="slider-range-value02">
                {sizeRange[1]}
              </span>
            </div>
          </div>
          <Slider
            range
            max={1000}
            min={0}
            value={sizeRange}
            onChange={setSizeRange}
          />
        </div>
      </div>
      <div className=" group-select">
        <div className="box-select">
          <DropdownSelect
            options={[
              "Provincia / ciudad",
              "CABA",
              "Buenos Aires",
              "Córdoba",
              "Santa Fe",
              "Mendoza",
              "Tucumán",
            ]}
            addtionalParentClass=""
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Ambientes", "1", "2", "3", "4", "5", "6", "7", "8"]}
            addtionalParentClass=""
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Baños: cualquiera", "1", "2", "3"]}
            addtionalParentClass=""
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Dormitorios: cualquiera", "1", "2", "3", "4", "5", "6"]}
            addtionalParentClass=""
          />
        </div>
      </div>
      <div className="group-checkbox">
        <div className=" title text-4 fw-6">Comodidades:</div>
        <div className="group-amenities ">
          <fieldset className="checkbox-item style-1  ">
            <label>
              <span className="text-4">Ropa de cama</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Detector de monóxido</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Caja de llaves</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Cafetera</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1  ">
            <label>
              <span className="text-4">Lavavajillas</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Chimenea</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Almohadas extra</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Botiquín</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1  ">
            <label>
              <span className="text-4">Perchas</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Plancha</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Microondas</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Estufa / calefacción</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1  ">
            <label>
              <span className="text-4">Heladera</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Cámaras de seguridad</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Alarma de humo</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
          <fieldset className="checkbox-item style-1   mt-12">
            <label>
              <span className="text-4">Patio / balcón</span>
              <input type="checkbox" />
              <span className="btn-checkbox" />
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
