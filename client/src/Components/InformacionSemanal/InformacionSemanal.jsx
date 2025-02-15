import { useEffect, useState } from "react";
import GraficoAnualLinea from "../GraficoAnualLinea/GraficoAnualLinea";
import ListaSemanal from "../ListaSemanal/ListaSemanal";
import styles from "./Informacion.module.css";
import GraficoSemanal from "../GraficoSemanal/GraficoSemanal";

export default function InformacionSemanal({ lista }) {
    const [listaSemanal, setListaSemanal] = useState([]);

    useEffect(() => {
        if (!lista || lista.length === 0) return;

        // Función para calcular el número de semana y el año ISO correspondiente
        function getISOWeekYearAndNumber(date) {
            const tempDate = new Date(date);
            tempDate.setHours(0, 0, 0, 0);

            // Ajustar al jueves de la semana actual para cumplir con la regla ISO 8601
            tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

            // Determinar el año ISO de la semana
            const yearISO = tempDate.getFullYear();

            // Calcular el número de semana ISO
            const firstThursday = new Date(yearISO, 0, 4);
            const weekNumber = Math.ceil(((tempDate - firstThursday) / 86400000 + firstThursday.getDay() - 1) / 7);

            return { yearISO, weekNumber };
        }

        const groupedByWeek = {};

        lista.forEach(item => {
            const date = new Date(item.anio, item.mes - 1, item.dia); // JS usa meses 0-indexed
            const { yearISO, weekNumber } = getISOWeekYearAndNumber(date);
            const key = `${yearISO}-Semana ${weekNumber}`;
        
            if (!groupedByWeek[key]) {
                groupedByWeek[key] = {
                    anio: yearISO,
                    semana: weekNumber,
                    mes: date.getMonth() + 1, // 🔥 Se agrega el mes correcto
                    totalVentas: 0,
                    totalComision: 0,
                    diasUnicos: new Set(),
                    promedioVentas: 0,
                    promedioComision: 0
                };
            }
        
            // Acumular valores
            groupedByWeek[key].totalVentas += item.ventas;
            groupedByWeek[key].totalComision += item.comision;
            groupedByWeek[key].diasUnicos.add(date.toISOString().split('T')[0]); // Guardamos fechas únicas
        });
        

        // Calcular el promedio semanal
        Object.values(groupedByWeek).forEach(semana => {
            const diasUnicos = semana.diasUnicos.size;
            semana.promedioVentas = diasUnicos ? semana.totalVentas / diasUnicos : 0;
            semana.promedioComision = diasUnicos ? semana.totalComision / diasUnicos : 0;
            delete semana.diasUnicos; // Ya no es necesario
        });

        // Convertimos el objeto en una lista ordenada por año y semana
        const listaOrdenada = Object.values(groupedByWeek).sort((a, b) => {
            return a.anio === b.anio ? a.semana - b.semana : a.anio - b.anio;
        });

        setListaSemanal(listaOrdenada);
    }, [lista]);

    return (
        <div id={styles.container}>
            <div id={styles.titleContainer}>Información Semanal</div>
            <div id={styles.mainInfo}>
                <GraficoSemanal data={listaSemanal} />
                <ListaSemanal lista={listaSemanal} />
            </div>
        </div>
    );
}
