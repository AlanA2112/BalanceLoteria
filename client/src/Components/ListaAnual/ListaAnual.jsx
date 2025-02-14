import { useState } from "react";
import ItemListaAnual from "../ItemListaAnual/ItemListaAnual";
import styles from "./ListaAnual.module.css";

export default function ListaAnual({ lista, promedioDiario }) {
    console.log(promedioDiario)
    return (
        <div id={styles.lista}>
            <div id={styles.item}>
                <div id={styles.fecha}>
                    <span id={styles.itemFecha}></span>
                    <span id={styles.itemFechaTitle} className={styles.headerTitle}>
                        Fecha
                    </span>
                    <span id={styles.itemFecha}></span>
                </div>
                <div id={styles.ventasComision}>
                    <span id={styles.itemVentasTitle} className={styles.headerTitle} >
                        Ventas
                    </span>
                    <span id={styles.itemComisionTitle} className={styles.headerTitle} >
                        Comisión
                    </span>
                    <span id={styles.itemComisionTitle} className={styles.headerTitle} >
                        Promedio
                    </span>
                </div>
            </div>
            <div id={styles.listaResumen}>
                {lista.map((l, k) => (
                    <ItemListaAnual key={k} data={l} promedioDiario={promedioDiario} />
                ))}
            </div>
        </div>
    );
}
