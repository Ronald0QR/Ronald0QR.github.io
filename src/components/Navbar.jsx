// Navbar.jsx
import React from "react";
import Dropdown from "./Dropdown";
import "../styles/Navbar.css";

const Navbar = () => {
  const items = [
    { text: "Cielo Drywall", link: "/cdm/cielo-drywall" },
    { text: "Muro", link: "cdm/cmd-muro" },
  ];
  const items2 = [
    { text: "Cotizar Cielo Drywall", link: "/cocielo-drywall" },
    { text: "Cielo PVC", link: "/cielo-pvc" },
    { text: "Cielo Tal", link: "/cielo-tal" },
  ];

  const productos = [{ text: "Drywall", link: "/drywall/productos" }];

  const handleDropdownItemClick = (item) => {
    // Acciones específicas cuando se hace clic en un ítem del dropdown
    console.log("Item del dropdown clickeado:", item.text);
    // Puedes realizar más acciones según la información del ítem
  };

  return (
    <nav className="navbar">
      <div>
        <Dropdown
          title="CDM"
          items={items}
          handleItemClick={handleDropdownItemClick}
        />
        <Dropdown
          title="Cotizacion"
          items={items2}
          handleItemClick={handleDropdownItemClick}
        />
        <Dropdown
          title="Productos"
          items={productos}
          handleItemClick={handleDropdownItemClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
