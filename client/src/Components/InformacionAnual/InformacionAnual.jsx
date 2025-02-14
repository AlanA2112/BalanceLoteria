import { useEffect, useState } from "react";
import ListaAnual from "../ListaAnual/ListaAnual";
import GraficoAnual from "../GraficoAnual/GraficoAnual";
import GraficoAnualLinea from "../GraficoAnualLinea/GraficoAnualLinea";

export default function InformacionAnual({ lista }) {
    const [listaAnual, setListaAnual] = useState([]);

    useEffect(() => {
        if (!lista || lista.length === 0) return;

        // Objeto para agrupar datos por mes y año
        const groupedByMonth = {};

        lista.forEach(item => {
            const key = `${item.anio}-${String(item.mes).padStart(2, "0")}`; // "2025-01", "2024-12"
            const diaKey = `${item.anio}-${item.mes}-${item.dia}`; // Para contar los días únicos

            if (!groupedByMonth[key]) {
                groupedByMonth[key] = {
                    anio: item.anio,
                    mes: item.mes,
                    totalVentas: 0,
                    totalComision: 0,
                    diasUnicos: new Set(),
                    promedioVentas: 0,
                    promedioComision: 0
                };
            }

            // Acumulamos los valores
            groupedByMonth[key].totalVentas += item.ventas;
            groupedByMonth[key].totalComision += item.comision;
            groupedByMonth[key].diasUnicos.add(diaKey);
        });

        // Calcular el promedio diario por mes
        Object.values(groupedByMonth).forEach(mes => {
            const diasUnicos = mes.diasUnicos.size;
            mes.promedioVentas = diasUnicos ? mes.totalVentas / diasUnicos : 0;
            mes.promedioComision = diasUnicos ? mes.totalComision / diasUnicos : 0;
            delete mes.diasUnicos; // Ya no necesitamos esta propiedad
        });

        // Convertimos el objeto a una lista ordenada por fecha (año y mes)
        const listaOrdenada = Object.values(groupedByMonth).sort((a, b) => {
            return a.anio === b.anio ? a.mes - b.mes : a.anio - b.anio;
        });

        setListaAnual(listaOrdenada);
    }, [lista]);

    return (
        <>
            <GraficoAnualLinea data={listaAnual} />
            <ListaAnual lista={listaAnual} />
            {/* <GraficoAnual data={listaAnual} /> */}
        </>
    );
}
