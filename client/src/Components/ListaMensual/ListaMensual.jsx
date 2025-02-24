import { useEffect, useState } from "react";
import ItemLista from "../ItemLista/ItemLista";
import styles from "./ListaMensual.module.css";

export default function ListaMensual({ 
    monthNames, 
    handleSort, 
    handleSelectYear, 
    handleSelectMonth,
    handleNextMonth, 
    handlePrevMonth, 
    availableYears, 
    currentIndex, 
    currentKey, 
    groupedByMonth, 
    sortConfig, 
    sortedKeys, 
    year, 
    month 
}) {

    return (
        <div id={styles.lista}>
            <div id={styles.header}>
                <button onClick={handlePrevMonth} disabled={currentIndex === sortedKeys.length - 1}>&lt;</button>

                {/* Selectores de mes y año */}
                <div className={styles.dateSelector}>
                    <select value={month} onChange={handleSelectMonth}>
                        {monthNames.map((m, i) => (
                            <option key={i} value={String(i + 1).padStart(2, "0")}>{m}</option>
                        ))}
                    </select>

                    <select value={year} onChange={handleSelectYear}>
                        {availableYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <button onClick={handleNextMonth} disabled={currentIndex === 0}>&gt;</button>
            </div>

            <div id={styles.item}>
                <div id={styles.fecha}>
                    <span id={styles.itemFecha}></span>
                    <span 
                        id={styles.itemFechaTitle} 
                        className={styles.headerTitle} 
                        onClick={() => handleSort('fecha')}
                    >
                        Fecha {sortConfig.key === 'fecha' && (sortConfig.direction === "asc" ? '▲' : '▼')}
                    </span>
                    <span id={styles.itemFecha}></span>
                </div>
                <div id={styles.ventasComision}>
                    <span 
                        id={styles.itemVentasTitle} 
                        className={styles.headerTitle} 
                        onClick={() => handleSort('ventas')}
                    >
                        Ventas {sortConfig.key === 'ventas' && (sortConfig.direction === "asc" ? '▲' : '▼')}
                    </span>
                    <span 
                        id={styles.itemComisionTitle} 
                        className={styles.headerTitle} 
                        onClick={() => handleSort('comision')}
                    >
                        Comisión {sortConfig.key === 'comision' && (sortConfig.direction === "asc" ? '▲' : '▼')}
                    </span>
                </div>
            </div>

            <div id={styles.listaResumen}>
                {groupedByMonth[currentKey]?.map((l, k) => (
                    <ItemLista key={k} data={l} />
                ))}
            </div>
        </div>
    );
}
