import { useEffect, useState } from "react";
import GraficoMensual from "../GraficoMensual/GraficoMensual";
import ListaAnual from "../ListaAnual/ListaAnual";
import ListaMensual from "../ListaMensual/ListaMensual";
import styles from "./Informacion.module.css";

export default function InformacionMensual({ lista }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        handleSort("fecha");
    }, []);

    // Ordenar lista por fecha
    const sortedList = [...lista].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const isAsc = sortConfig.direction === "asc" ? 1 : -1;

        if (sortConfig.key === "fecha") {
            const dateA = new Date(a.anio, a.mes - 1, a.dia);
            const dateB = new Date(b.anio, b.mes - 1, b.dia);

            // Comparar las fechas de forma correcta (menor a mayor)
            if (dateA < dateB) {
                return isAsc;
            } else if (dateA > dateB) {
                return -isAsc;
            }
            return 0;
        }

        return (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1) * isAsc;
    });

    // Agrupar por mes y año
    const groupedByMonth = sortedList.reduce((acc, item) => {
        const key = `${item.anio}-${String(item.mes).padStart(2, "0")}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const sortedKeys = Object.keys(groupedByMonth).sort((a, b) => b.localeCompare(a)); // Orden descendente
    const [currentIndex, setCurrentIndex] = useState(sortedKeys.length);

    // Obtener el mes y año actual
    const currentKey = sortedKeys[currentIndex] || sortedKeys[0] || "0000-01";
    const [year, month] = currentKey.split("-");

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const availableYears = [...new Set(sortedKeys.map(k => k.split("-")[0]))];

    function handlePrevMonth() {
        setCurrentIndex(prev => Math.min(prev + 1, sortedKeys.length - 1));
    }

    function handleNextMonth() {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    }

    function handleSelectMonth(event) {
        const newMonth = event.target.value;
        const newKey = `${year}-${String(newMonth).padStart(2, "0")}`;
        const newIndex = sortedKeys.indexOf(newKey);
        if (newIndex !== -1) setCurrentIndex(newIndex);
    }

    function handleSelectYear(event) {
        const newYear = event.target.value;
        const newKey = sortedKeys.find(key => key.startsWith(newYear));
        if (newKey) setCurrentIndex(sortedKeys.indexOf(newKey));
    }

    function handleSort(key) {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    }

    return (
        <div id={styles.container}>
            <div id={styles.titleContainer}>Informacion Diaria</div>
            <div id={styles.mainInfo}>
                <ListaMensual lista={lista} monthNames={monthNames} handleSort={handleSort}
                    handleSelectYear={handleSelectYear} handleSelectMonth={handleSelectMonth} handleNextMonth={handleNextMonth}
                    handlePrevMonth={handlePrevMonth} availableYears={availableYears} sortedList={sortedList}
                    currentIndex={currentIndex} currentKey={currentKey} groupedByMonth={groupedByMonth}
                    sortConfig={sortConfig} sortedKeys={sortedKeys} year={year} month={month}
                />
                <GraficoMensual data={groupedByMonth[currentKey] || []} />
            </div>
        </div>
    );
}
