import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import "../styles/CieloComponente.css"; // Importa el archivo CSS

const CieloComponente = () => {
  const [metro2, setMetro2] = useState(0);
  const [cantidadPlacas, setCantidadPlacas] = useState(0);
  const [cantidadAngulos, setCantidadAngulos] = useState(0);
  const [cantidadOmegas, setCantidadOmegas] = useState(0);
  const [cantidadVigueta, setCantidadVigueta] = useState(0);
  const [cantidadTornilloL, setCantidadTornilloL] = useState(0);
  const [cantidadTornilloC, setCantidadTornilloC] = useState(0);
  const [cantidadChazoPuntilla, setCantidadChazoPuntilla] = useState(0);
  const [cantidadCintaMallaAd, setCantidadCintaMallaAd] = useState(0);
  const [cantidadLija, setCantidadLija] = useState(0);
  const [cantidadMasilla, setCantidadMasilla] = useState(0);
  const [cantidadPinturaBlancaT2, setCantidadPinturaBlancaT2] = useState(0);

  // Ref para acceder al contenido del resultado
  const resultadoRef = useRef(null);

  // Función para imprimir o crear PDF
  const handleImprimir = () => {
    const input = resultadoRef.current;

    html2pdf(input, {
      margin:  2,
      filename: "Materiales-calculados.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  const calcularMateriales = () => {
    // Lógica de cálculo de materiales
    const area = metro2;
    const factorPlaca = 0.34;
    const factorAngulo = 0.42;
    const factorOmega = 0.81;
    const factorVigueta = 0.56;
    const factorTornilloL = 8.6;
    const factorTornilloC = 11.5;
    const factorChazoPuntilla = 1.64;
    const factorMasilla = 0.05;
    const factorCintaMallaAdhesiva = 0.008;
    const factorLija = 0.06;
    const factorPinturaBlancaT2 = 0.05;

    const cantidadPlacasCalculada = area * factorPlaca;
    const cantidadAngulosCalculado = area * factorAngulo;
    const CantidadOmegasCalculada = factorOmega * area;
    const cantidadViguetaCal = factorVigueta * area;
    const cantidadTornilloLCal = factorTornilloL * area;
    const cantidadTornilloCCAl = factorTornilloC * area;
    const cantidadChazoPuntillaCal = factorChazoPuntilla * area;
    const cantidadMasillaCal = factorMasilla * area;
    const cantidadCintaMallaAdCal = factorCintaMallaAdhesiva * area;
    const cantidadLijaCal = factorLija * area;
    const cantidadPinturaBlancaT2Cal = factorPinturaBlancaT2 * area;

    setCantidadPlacas(cantidadPlacasCalculada);
    setCantidadAngulos(cantidadAngulosCalculado);
    setCantidadOmegas(CantidadOmegasCalculada);
    setCantidadVigueta(cantidadViguetaCal);
    setCantidadTornilloL(cantidadTornilloLCal);
    setCantidadTornilloC(cantidadTornilloCCAl);
    setCantidadChazoPuntilla(cantidadChazoPuntillaCal);
    setCantidadMasilla(cantidadMasillaCal);
    setCantidadCintaMallaAd(cantidadCintaMallaAdCal);
    setCantidadLija(cantidadLijaCal);
    setCantidadPinturaBlancaT2(cantidadPinturaBlancaT2Cal);
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
          <div className="tableP">
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Placas de Drywall</td>
                  <td>{cantidadPlacas}</td>
                </tr>
                <tr>
                  <td>Ángulo</td>
                  <td>{cantidadAngulos}</td>
                </tr>
                <tr>
                  <td>Omega</td>
                  <td>{cantidadOmegas}</td>
                </tr>
                <tr>
                  <td>Vigueta</td>
                  <td>{cantidadVigueta}</td>
                </tr>
                <tr>
                  <td>Tornillo De Placa</td>
                  <td>{cantidadTornilloL}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tableS">
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tornillo De Estructura</td>
                  <td>{cantidadTornilloC}</td>
                </tr>
                <tr>
                  <td>Masilla</td>
                  <td>{cantidadMasilla}</td>
                </tr>
                <tr>
                  <td>Cinta Malla Adhesiva</td>
                  <td>{cantidadCintaMallaAd}</td>
                </tr>
                <tr>
                  <td>Lija</td>
                  <td>{cantidadLija}</td>
                </tr>
                <tr>
                  <td>Pintura Blanca Tipo 2</td>
                  <td>{cantidadPinturaBlancaT2}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="cotizar">$ Cotizar</button>
        <button className="cotizar" onClick={handleImprimir}>
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default CieloComponente;
