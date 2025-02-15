import { useDispatch } from "react-redux";
import styles from "../ListaSemanal/ListaSemanal.module.css";
import { deleteById } from "../../redux/actions/actions";

export default function ItemListaSemanal({ data, promedioDiario }) {
    const dispatch = useDispatch();

    return (
        <div id={styles.item}>
            <div id={styles.fecha}>
                <span id={styles.itemFecha}>{String(data.semana).padStart(2, '0')}</span>
                <span id={styles.itemFecha}>{data.anio}</span>
            </div>
            <div id={styles.ventasComision}>
                <span id={styles.itemComision}>${Number(data.totalVentas).toLocaleString()}</span>
                <span id={styles.itemComision}>${Number(data.totalComision).toLocaleString()}</span>
                <span id={styles.itemComision}>${Number(data.promedioComision.toFixed()).toLocaleString()}</span>
            </div>
        </div>
    )
}