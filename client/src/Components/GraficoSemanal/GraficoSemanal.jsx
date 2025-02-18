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
  const mesesCortos = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const etiquetas = data.map((item) => {
    const mesIndex = parseInt(item.mes, 10) - 1;
    const nombreMes = meses[mesIndex] || "Mes desconocido";
    const nombreMesCorto = mesesCortos[mesIndex] || "Mes";

    return window.innerWidth < 768
      ? `${nombreMesCorto} ${item.anio.toString().slice(2)}`
      : `Semana ${item.semana} (${nombreMes}) - ${item.anio}`;
  });

  const datasets = [];
  if (showVentas) {
    datasets.push({
      label: "Ventas",
      data: data.map((item) => item.totalVentas),
      backgroundColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(75, 192, 192, 0.2)"),
      borderColor: data.map((item) => coloresMes[item.mes - 1].replace("0.2", "0.8") || "rgba(75, 192, 192, 0.8)"), // Más brillante
      borderWidth: 2,
      fill: tipoGrafico === "lineas",
    });
  }

  if (showComision) {
    datasets.push({
      label: "Comisión",
      data: data.map((item) => item.totalComision),
      backgroundColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(153, 102, 255, 0.2)"),
      borderColor: data.map((item) => coloresMes[item.mes - 1].replace("0.2", "0.8") || "rgba(153, 102, 255, 0.8)"), // Más brillante
      borderWidth: 2,
      fill: tipoGrafico === "lineas",
    });
  }

  if (showPromedio) {
    datasets.push({
      label: "Promedio",
      data: data.map((item) => item.promedioComision),
      backgroundColor: data.map((item) => coloresMes[item.mes - 1] || "rgba(153, 102, 255, 0.2)"),
      borderColor: data.map((item) => coloresMes[item.mes - 1].replace("0.2", "0.8") || "rgba(153, 102, 255, 0.8)"), // Más brillante
      borderWidth: 2,
      borderDash: [5, 5],
      fill: false,
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
          title: (tooltipItems) => etiquetas[tooltipItems[0].dataIndex],
          label: (tooltipItem) => `$${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value, index) => {
            if (window.innerWidth < 768) {
              return etiquetas[index];
            }
            return etiquetas[index];
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 14,
          },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
        },
      },
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
