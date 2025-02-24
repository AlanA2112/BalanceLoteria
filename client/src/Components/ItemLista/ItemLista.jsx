import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../Lista/Lista.module.css";
import { deleteById, updateResumen } from "../../redux/actions/actions";

export default function ItemLista({ data }) {
    const dispatch = useDispatch();
    const [editableField, setEditableField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isPressing, setIsPressing] = useState(false); // Estado para manejar el "mantener presionado"

    function onDeleteHandler() {
        const itemDetails = `${data.dia}/${data.mes}/${data.anio} - Ventas: $${Number(data.ventas).toLocaleString()} - Comisión: $${Number(data.comision).toLocaleString()}`;
        const isConfirmed = window.confirm(`¿Estás seguro de que quieres eliminar este elemento?\n\n${itemDetails}`);
        if (isConfirmed) {
            dispatch(deleteById(data.id));
        }
    }

    function handleDoubleClick(field, value) {
        setEditableField(field);
        setEditValue(value);
    }

    function handlePressAndHold(field, value) {
        // Lógica para manejar el mantener presionado
        console.log(`Manteniendo presionado ${field}: ${value}`);
        setEditableField(field); // Cambiar a modo edición si lo deseas
        setEditValue(value);
    }

    function handleMouseDown(field, value) {
        setIsPressing(true);
        setTimeout(() => {
            if (isPressing) {
                handlePressAndHold(field, value);
            }
        }, 1000); // Activar después de 1 segundo de presionar
    }

    function handleMouseUp() {
        setIsPressing(false);
    }

    function handleTouchStart(field, value) {
        setIsPressing(true);
        setTimeout(() => {
            if (isPressing) {
                handlePressAndHold(field, value);
            }
        }, 1000); // Activar después de 1 segundo de mantener
    }

    function handleTouchEnd() {
        setIsPressing(false);
    }

    function handleChange(e) {
        setEditValue(e.target.value);
    }

    function handleBlur() {
        if (editValue !== "" && editValue !== data[editableField]) {
            dispatch(updateResumen({ id: data.id, [editableField]: editValue }));
        }
        setEditableField(null);
    }

    return (
        <div id={styles.item}>
            <div id={styles.fecha}>
                {["dia", "mes", "anio"].map((field) => (
                    <span
                        key={field}
                        id={styles.itemFecha}
                        onDoubleClick={() => handleDoubleClick(field, data[field])}
                        onMouseDown={() => handleMouseDown(field, data[field])} // Manejar mouse
                        onMouseUp={handleMouseUp}
                        onTouchStart={() => handleTouchStart(field, data[field])} // Manejar toque
                        onTouchEnd={handleTouchEnd}
                    >
                        {editableField === field ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.inputEdit}
                            />
                        ) : (
                            String(data[field]).padStart(2, '0')
                        )}
                    </span>
                ))}
            </div>
            <div id={styles.ventasComision}>
                {["ventas", "comision"].map((field) => (
                    <span
                        key={field}
                        id={styles.itemComision}
                        onDoubleClick={() => handleDoubleClick(field, data[field])}
                        onMouseDown={() => handleMouseDown(field, data[field])} // Manejar mouse
                        onMouseUp={handleMouseUp}
                        onTouchStart={() => handleTouchStart(field, data[field])} // Manejar toque
                        onTouchEnd={handleTouchEnd}
                    >
                        {editableField === field ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.inputEdit}
                            />
                        ) : (
                            `$${Number(data[field]).toLocaleString()}`
                        )}
                    </span>
                ))}
                <span id={styles.delete} onClick={onDeleteHandler}>✗</span>
            </div>
        </div>
    );
}
