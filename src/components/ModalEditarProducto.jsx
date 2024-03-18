import React, { useState } from "react";
import "../styles/ModalEditar.css";

const ModalEditarProducto = ({ producto, onUpdate, onClose }) => {
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ id: producto.id, nombre, precio });
  };

  const handleCloseModal = () => {
    onClose(); // Llamada a la función onClose para cerrar el modal
  };

  return (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
          <label>
            Precio:
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </label>
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarProducto;
