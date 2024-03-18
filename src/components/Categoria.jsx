import React, { useState, useEffect } from "react";
import "../styles/Categoria.css";
import Productos from "./Productos";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaTabla, setNuevaTabla] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/tablas")
      .then((response) => response.json())
      .then((data) => setCategorias(data.categorias))
      .catch((error) => console.error("Error al obtener las tablas:", error));
  }, []);

  const handleAgregarCategoria = () => {
    if (!nuevaTabla.trim()) {
      alert("Por favor, ingrese una nueva categoría");
      return;
    }

    fetch("http://localhost:3000/agregarCategoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nuevaCategoria: nuevaTabla }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Actualizar la lista de categorías solo si lo necesitas
        setCategorias([...categorias, nuevaTabla]);
        setNuevaTabla("");
      })
      .catch((error) =>
        console.error("Error al agregar la nueva categoría:", error)
      );
  };

  const handleVerProductos = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <div className="categoria">
      <div className="sub_nav">

        <ul className="accesorios_categoria">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleVerProductos(categoria)}
            >
              {categoria}
            </button>
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={nuevaTabla}
          onChange={(e) => setNuevaTabla(e.target.value)}
        />
        <button onClick={handleAgregarCategoria}>Nueva Categoría</button>
      </div>

      {categoriaSeleccionada && <Productos categoria={categoriaSeleccionada} />}
    </div>
  );
};

export default Categorias;
