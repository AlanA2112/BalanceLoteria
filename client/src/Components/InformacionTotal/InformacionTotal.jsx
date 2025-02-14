import { useEffect, useState } from "react";
import ListaAnual from "../ListaAnual/ListaAnual";
import GraficoAnual from "../GraficoAnual/GraficoAnual";
import GraficoAnualLinea from "../GraficoAnualLinea/GraficoAnualLinea";
import Grafico from "../Grafico/Grafico";
import Lista from "../Lista/Lista";

export default function InformacionTotal({ lista }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const sortedList = [...lista].sort((a, b) => {
        if (!sortConfig.key) return 0; // No ordenar si no hay criterio
        const isAsc = sortConfig.direction === "asc" ? 1 : -1;

        if (sortConfig.key === "fecha") {
            const dateA = new Date(a.anio, a.mes - 1, a.dia);
            const dateB = new Date(b.anio, b.mes - 1, b.dia);
            return dateA > dateB ? isAsc : -isAsc;
        }

        return a[sortConfig.key] > b[sortConfig.key] ? isAsc : -isAsc;
    });

    function handleSort(key) {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    }


    return (
        <>
            <Grafico data={sortedList} />
            <Lista sortedList={sortedList} handleSort={handleSort} sortConfig={sortConfig} />
            {/* <GraficoAnual data={listaAnual} /> */}
        </>
    );
}
