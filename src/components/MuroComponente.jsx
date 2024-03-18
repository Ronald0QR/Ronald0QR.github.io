// CieloComponente.jsx

import React, { useState } from "react";
import "../styles/CieloComponente.css"; // Importa el archivo CSS

const MuroComponente = () => {
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

  const calcularMateriales = () => {
    // Lógica de cálculo de materiales
    const area = metro2;
    const factorPlaca = 0.69;
    const factorAngulo = 0.76;
    const factorOmega = 0.34;
    const factorVigueta = 0.56;
    const factorTornilloL = 23;
    const factorTornilloC = 2.8;
    const factorChazoPuntilla = 2;
    const factorMasilla = 0.1;
    const factorCintaMallaAdhesiva = 0.016;
    const factorLija = 0.12;
    const factorPinturaBlancaT2 = 0.1;

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
        <h2>Muro Drywall - Calculadora de Materiales</h2>
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

      <div className="resultado">
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
        <div className="boton-cotizar">
          <button className="cotizar">$ Cotizar</button>
          <button className="cotizar">Imprimir</button>
        </div>
      </div>
    </div>
  );
};

export default MuroComponente;
