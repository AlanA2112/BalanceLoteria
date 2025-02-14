import { useDispatch } from "react-redux";
import styles from "../Lista/Lista.module.css";
import { deleteById } from "../../redux/actions/actions";

export default function ItemLista({ data }) {
    const dispatch = useDispatch();

    function onDeleteHandler() {
        const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este elemento?");
        if (isConfirmed) {
            dispatch(deleteById(data.id));
        }
    }
    

    return (
        <div id={styles.item}>
            <div id={styles.fecha}>
                <span id={styles.itemFecha}>{String(data.dia).padStart(2, '0')}</span>
                <span id={styles.itemFecha}>{String(data.mes).padStart(2, '0')}</span>
                <span id={styles.itemFecha}>{data.anio}</span>
            </div>
            <div id={styles.ventasComision}>
                <span id={styles.itemComision}>${Number(data.ventas).toLocaleString()}</span>
                <span id={styles.itemComision}>${Number(data.comision).toLocaleString()}</span>
                <span id={styles.delete} onClick={() => onDeleteHandler()}>✗</span>
            </div>
        </div>
    )
}