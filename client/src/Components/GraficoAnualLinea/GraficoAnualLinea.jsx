import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import styles from "./GraficoAnual.module.css";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function GraficoAnual({ data }) {
  const [tipoGrafico, setTipoGrafico] = useState("barras");
  const [showVentas, setShowVentas] = useState(true);
  const [showComision, setShowComision] = useState(true);

  const fechas = data.map(item => `${String(item.mes).padStart(2, '0')}-${item.anio}`);

  const datasets = [];
  if (showVentas) {
    datasets.push({
      label: "Ventas",
      data: data.map(item => item.totalVentas),
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      fill: tipoGrafico === "lineas",
    });
  }

  if (showComision) {
    datasets.push({
      label: "Comisión",
      data: data.map(item => item.totalComision),
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 2,
      fill: tipoGrafico === "lineas",
    });
  }

  const chartData = { labels: fechas, datasets };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Ventas y Comisiones por Mes",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div id={styles.graficoContainer}>
      {/* Contenedor del título y selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        {/* <div id={styles.title}></div> */}
        <h3 id={styles.title}>Ventas y Comisiones</h3>
        <div className={styles.dateSelector}>
          <select value={tipoGrafico} onChange={(e) => setTipoGrafico(e.target.value)} >
            <option value="barras" className={styles.dateSelector}>Barras</option>
            <option value="lineas" className={styles.dateSelector}>Líneas</option>
          </select>
        </div>
      </div>

      {/* Renderiza el gráfico según la selección */}
      {tipoGrafico === "barras" ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />}

      {/* Opciones para mostrar u ocultar series */}
      <div style={{ marginTop: "10px" }}>
        <label>
          <input type="checkbox" checked={showVentas} onChange={() => setShowVentas(!showVentas)} />
          Ventas
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input type="checkbox" checked={showComision} onChange={() => setShowComision(!showComision)} />
          Comisión
        </label>
      </div>
    </div>
  );
}
