import React, { useState, useEffect } from "react";
import ModalEditarProducto from "./ModalEditarProducto";
import "../styles/Productos.css";

const Productos = ({ categoria }) => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/productos/${categoria}`)
      .then((response) => response.json())
      .then((data) => setProductos(data.productosC))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  }, [categoria]);

  const handleAgregarProducto = () => {
    if (!nombre.trim() || !precio.trim() || isNaN(parseFloat(precio))) {
      setMensajeAlerta("Por favor, ingrese un nombre y un precio válido.");
      return;
    }

    fetch(`http://localhost:3000/agregarProducto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria, nombre, precio }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMensajeAlerta(data.message);
        setNombre("");
        setPrecio("");
        setProductos([...productos, { id: data.id, nombre, precio }]);
      })
      .catch((error) =>
        console.error("Error al agregar el nuevo producto:", error)
      );
  };

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setModalAbierto(true);
  };

  const handleClose = () => {
    setProductoEditando(null);
    setModalAbierto(false);
  };

  const handleActualizarProducto = (productoActualizado) => {
    fetch(
      `http://localhost:3000/productos/${categoria}/${productoActualizado.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: productoActualizado.nombre,
          precio: productoActualizado.precio,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMensajeAlerta(data.message);
        const productosActualizados = productos.map((producto) =>
          producto.id === productoActualizado.id
            ? productoActualizado
            : producto
        );
        setProductos(productosActualizados);
        setProductoEditando(null);
        setModalAbierto(false);
      })
      .catch((error) =>
        console.error("Error al actualizar el producto:", error)
      );
  };

  const handleEliminarProducto = (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      fetch(`http://localhost:3000/productos/${categoria}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          setMensajeAlerta(data.message);
          const nuevosProductos = productos.filter(
            (producto) => producto.id !== id
          );
          setProductos(nuevosProductos);
        })
        .catch((error) =>
          console.error("Error al eliminar el producto:", error)
        );
    }
  };

  return (
    <div>
      <h3>Productos de la categoría {categoria}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>
                <button onClick={() => handleEditarProducto(producto)}>
                  Editar
                </button>
                <button onClick={() => handleEliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio del producto"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button onClick={handleAgregarProducto}>Agregar a {categoria}</button>
      </div>
      {productoEditando && (
        <ModalEditarProducto
          producto={productoEditando}
          onUpdate={handleActualizarProducto}
          onClose={handleClose}
        />
      )}
      {mensajeAlerta && <div>{mensajeAlerta}</div>}
    </div>
  );
};

export default Productos;
