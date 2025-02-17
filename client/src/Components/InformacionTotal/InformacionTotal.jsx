import { useEffect, useState } from "react";
import ListaAnual from "../ListaAnual/ListaAnual";
import GraficoAnual from "../GraficoAnual/GraficoAnual";
import GraficoAnualLinea from "../GraficoAnualLinea/GraficoAnualLinea";
import Grafico from "../Grafico/Grafico";
import Lista from "../Lista/Lista";
import styles from "./Informacion.module.css";

export default function InformacionTotal({ lista }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    // Ordenar lista por fecha
    const sortedList = [...lista].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const isAsc = sortConfig.direction === "asc" ? 1 : -1;
    
        if (sortConfig.key === "fecha") {
            const dateA = new Date(a.anio, a.mes - 1, a.dia);
            const dateB = new Date(b.anio, b.mes - 1, b.dia);
    
            // Comparar las fechas de forma correcta (menor a mayor)
            if (dateA < dateB) {
                return isAsc; // Si A es menor que B, devolver "asc" o "desc"
            } else if (dateA > dateB) {
                return -isAsc; // Si A es mayor que B, devolver el valor opuesto
            }
            return 0; // Si son iguales
        }
    
        // Si no es "fecha", ordenar por el valor de otra clave
        return (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1) * isAsc;
    });

    function handleSort(key) {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    }


    return (
        <div id={styles.container}>
            <div id={styles.titleContainer}>Informacion Historica</div>
            <div id={styles.mainInfo}>
                <Grafico data={sortedList} />
                <Lista sortedList={sortedList} handleSort={handleSort} sortConfig={sortConfig} />
                {/* <GraficoAnual data={listaAnual} /> */}
            </div>
        </div>
    );
}
