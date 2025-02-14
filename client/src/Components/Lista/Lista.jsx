import { useState } from "react";
import ItemLista from "../ItemLista/ItemLista";
import styles from "./Lista.module.css";

export default function Lista({ sortedList, handleSort, sortConfig }) {
    
    return (
        <div id={styles.lista}>
            <div id={styles.item}>
                <div id={styles.fecha}>
                    <span id={styles.itemFecha}></span>
                    <span id={styles.itemFechaTitle} className={styles.headerTitle} onClick={() => handleSort('fecha')}>
                        Fecha {sortConfig.key === 'fecha' && (sortConfig.direction === "asc" ? '▲' : '▼')}
                    </span>
                    <span id={styles.itemFecha}></span>
                </div>
                <div id={styles.ventasComision}>
                    <span id={styles.itemVentasTitle} className={styles.headerTitle} onClick={() => handleSort('ventas')}>
                        Ventas {sortConfig.key === 'ventas' && (sortConfig.direction === "asc" ? '▲' : '▼')}
                    </span>
                    <span id={styles.itemComisionTitle} className={styles.headerTitle} onClick={() => handleSort('comision')}>
                        Comisión {sortConfig.key === 'comision' && (sortConfig.direction === "asc" ? '▲' : '▼')}
                    </span>
                </div>
            </div>
            <div id={styles.listaResumen}>
                {sortedList.map((l, k) => (
                    <ItemLista key={k} data={l} />
                ))}
            </div>
        </div>
    );
}
