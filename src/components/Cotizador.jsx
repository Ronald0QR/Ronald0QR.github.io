import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import "../styles/CieloComponente.css"; // Importa el archivo CSS

const CieloComponente = () => {
  const [metro2, setMetro2] = useState(0);
  const [materiales, setMateriales] = useState([]);
  const [total, setTotal] = useState(0);

  // Ref para acceder al contenido del resultado
  const resultadoRef = useRef(null);

  // Obtener los datos de los materiales desde la base de datos
  useEffect(() => {
    // Aquí realizarías la solicitud a la base de datos para obtener los datos de los materiales
    // Supongamos que tienes un endpoint /materiales que devuelve los materiales con su nombre y precio
    fetch("/materiales")
      .then((response) => response.json())
      .then((data) => setMateriales(data))
      .catch((error) =>
        console.error("Error al obtener los datos de los materiales:", error)
      );
  }, []);

  // Función para imprimir o crear PDF
  const handleImprimir = () => {
    const input = resultadoRef.current;

    html2pdf(input, {
      margin:  2,
      filename: "Cotizacion.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  const calcularMateriales = () => {
    // Lógica de cálculo de materiales
    // Aquí se calculan los materiales necesarios en función de los metros cuadrados ingresados
    // Además, se agrega el precio de cada material desde la base de datos
    // Supongamos que cada material tiene una propiedad "precio" en la base de datos

    // Por ahora, solo agregaremos algunos materiales de ejemplo con precios aleatorios
    const materialesCalculados = [
      { nombre: "Material 1", cantidad: 10, precio: 5 },
      { nombre: "Material 2", cantidad: 20, precio: 8 },
      { nombre: "Material 3", cantidad: 30, precio: 12 },
      // Agrega más materiales según sea necesario
    ];

    setMateriales(materialesCalculados);
  };

  const cotizarTotal = () => {
    // Calcula el valor total multiplicando la cantidad de cada material por su precio
    const totalCalculado = materiales.reduce((acc, material) => {
      return acc + material.cantidad * material.precio;
    }, 0);

    setTotal(totalCalculado);
  };

  return (
    <div className="calculadora">
      <div className="titulo">
        <h2>Cielo Drywall - Calculadora de Materiales</h2>
      </div>

      <div className="metro2">
        <label>M2 </label>

        <input
          type="number"
          value={metro2}
          onChange={(e) => setMetro2(e.target.value)}
        />

        <button onClick={calcularMateriales}>Calcular</button>
      </div>

      <div className="resultado" ref={resultadoRef}>
        <h3>LDM</h3>
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {materiales.map((material, index) => (
                <tr key={index}>
                  <td>{material.nombre}</td>
                  <td>{material.cantidad}</td>
                  <td>{material.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="cotizar" onClick={cotizarTotal}>Cotizar</button>
        <button className="cotizar" onClick={handleImprimir}>
          Imprimir
        </button>
        <div>Total: {total}</div>
      </div>
    </div>
  );
};

export default CieloComponente;
