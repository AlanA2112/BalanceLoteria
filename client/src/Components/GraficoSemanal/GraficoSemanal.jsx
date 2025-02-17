import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./GraficoSemanal.module.css";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function GraficoSemanal({ data }) {
  const [tipoGrafico, setTipoGrafico] = useState("barras");
  const [showVentas, setShowVentas] = useState(true);
  const [showComision, setShowComision] = useState(true);
  const [showPromedio, setShowPromedio] = useState(true);

  // Meses en español
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Colores para cada mes
  const coloresMes = [
    "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", 
    "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", 
    "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"
  ];

  // Generar etiquetas con formato: "Semana X (Mes) - Año"
  const etiquetas = data.map((item) => {
    const mesIndex = parseInt(item.mes, 10) - 1; // Convertimos a número y ajustamos al índice (0-11)
    const nombreMes = meses[mesIndex] || "Mes desconocido";

    return item.semana !== undefined && item.anio !== undefined
      ? `Semana ${item.semana} (${nombreMes}) - ${item.anio}`
      : "Semana desconocida";
  });

  const datasets = [];
  if (showVentas) {
    datasets.push({
      label: "Ventas",
      data: data.map((item) => item.totalVentas),
      backgroundColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(75, 192, 192, 0.2)"), // Asigna color por mes
      borderColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(75, 192, 192, 1)"),
      borderWidth: 2,
      fill: tipoGrafico === "lineas",
    });
  }

  if (showComision) {
    datasets.push({
      label: "Comisión",
      data: data.map((item) => item.totalComision),
      backgroundColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(153, 102, 255, 0.2)"),
      borderColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(153, 102, 255, 1)"),
      borderWidth: 2,
      fill: tipoGrafico === "lineas",
    });
  }

  if (showPromedio) {
    datasets.push({
      label: "Promedio",
      data: data.map((item) => item.promedioComision),
      backgroundColor: "rgba(255, 206, 86, 0.3)", // Amarillo translúcido
      borderColor: "rgba(255, 206, 86, 1)", // Amarillo sólido
      borderWidth: 2,
      borderDash: [5, 5], // 🔥 Línea punteada para diferenciar
      fill: false, // No relleno
    });
  }

  const chartData = {
    labels: etiquetas,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Ventas y Comisiones por Semana",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => etiquetas[tooltipItems[0].dataIndex], // Etiqueta con semana y mes
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
        <div style={{ width: "33%" }}></div>
        <h3 style={{ width: "33%" }}>Ventas y Comisiones</h3>
        <div className={styles.dateSelector} style={{ width: "33%" }}>
          <select value={tipoGrafico} onChange={(e) => setTipoGrafico(e.target.value)}>
            <option value="barras">Barras</option>
            <option value="lineas">Líneas</option>
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
        <label style={{ marginLeft: "10px" }}>
          <input type="checkbox" checked={showPromedio} onChange={() => setShowPromedio(!showPromedio)} />
          Promedio
        </label>
      </div>
    </div>
  );
}
