import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from "./GraficoAnual.module.css";

// Registramos los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoAnual({ data }) {
  const [showVentas, setShowVentas] = useState(true);
  const [showComision, setShowComision] = useState(true);

  // Crear etiquetas para el eje X (mes y año)
  const labels = data.map(item => {
    const fecha = new Date(item.anio, item.mes - 1); // `mes-1` porque Date usa base 0
    return fecha.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  });

  const datasets = [];
  
  if (showVentas) {
    datasets.push({
      label: 'Ventas',
      data: data.map(item => item.totalVentas),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    });
  }

  if (showComision) {
    datasets.push({
      label: 'Comisión',
      data: data.map(item => item.totalComision),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Ventas y Comisiones Mensuales',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          }
        }
      }
    }
  };

  return (
    <div id={styles.graficoContainer}>
      <Bar data={chartData} options={options} />
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input type="checkbox" checked={showVentas} onChange={() => setShowVentas(!showVentas)} />
          Ventas
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input type="checkbox" checked={showComision} onChange={() => setShowComision(!showComision)} />
          Comisión
        </label>
      </div>
    </div>
  );
}
