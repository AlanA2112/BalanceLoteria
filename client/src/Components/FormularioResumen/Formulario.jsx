import { useState, useRef } from "react";
import styles from "./Formulario.module.css";
import { useDispatch } from "react-redux";
import { addResumen, getAll } from "../../redux/actions/actions";

export default function Formulario() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ dia: "", mes: "", anio: "", comision: "", ventas: "" });

    // Referencias para los inputs
    const mesInputRef = useRef(null);
    const anioInputRef = useRef(null);
    const ventasInputRef = useRef(null);
    const comisionInputRef = useRef(null);

    function onFormChangeHandler(e) {
        let value = e.target.value.replace(/\D/g, ""); // Elimina todo lo que no sea número

        if (e.target.name === "dia" || e.target.name === "mes" || e.target.name === "anio") {
            setForm({ ...form, [e.target.name]: value });

            // Si el valor de "dia" tiene 2 caracteres, mover el foco al campo "mes"
            if (e.target.name === "dia" && value.length === 2) {
                mesInputRef.current.focus();
            }

            // Si el valor de "mes" tiene 2 caracteres, mover el foco al campo "año"
            if (e.target.name === "mes" && value.length === 2) {
                anioInputRef.current.focus();
            }

            // Si el valor de "anio" tiene 4 caracteres, mover el foco al campo "ventas"
            if (e.target.name === "anio" && value.length === 4) {
                ventasInputRef.current.focus();
            }

            return;
        }

        // Si el campo es "ventas", mover el foco al campo "comision" cuando tenga 6 caracteres
        if (e.target.name === "ventas" && value.length === 6) {
            comisionInputRef.current.focus();
        }

        // Formatea el valor numérico con puntos de miles para ventas y comisiones
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setForm({ ...form, [e.target.name]: value });
    }

    function sendData() {
        // Convertir los valores a números correctamente
        const dataToSend = {
            dia: parseInt(form.dia, 10) || 0,  // Convertir día a número entero
            mes: parseInt(form.mes, 10) || 0,  // Convertir mes a número entero
            anio: parseInt(form.anio, 10) || 0,  // Convertir año a número entero
            comision: cleanNumber(form.comision),  // Convertir comisión a número
            ventas: cleanNumber(form.ventas),  // Convertir ventas a número
        };

        // alert(JSON.stringify(dataToSend)); // Mostrar los datos convertidos
        dispatch(addResumen(dataToSend));

        setForm({ dia: "", mes: "", anio: "", comision: "", ventas: "" });
    }

    function cleanNumber(value) {
        // Eliminar puntos usados como separadores de miles y convertir a número
        const cleanedValue = value.replace(/[\.,]/g, ""); // Elimina puntos y comas
        return parseInt(cleanedValue) || 0; // Convertimos a número
    }

    function handleKeyDown(e) {
        // Si se presiona Enter (keyCode 13 o e.key === "Enter"), enviar el formulario
        if (e.key === "Enter") {
            e.preventDefault(); // Evitar el comportamiento predeterminado (como el salto de línea en algunos inputs)
            sendData(); // Llamar a la función de enviar datos
        }
    }

    return (
        <div id={styles.formContainer}>
            <div id={styles.inputContainer}>
                <span id={styles.label}>Fecha</span>
                <div id={styles.symbol}>
                    <span id={styles.labelInside}></span>
                    <input
                        id={styles.input}
                        type="text"
                        maxLength="2"
                        value={form.dia}
                        name="dia"
                        onChange={(e) => onFormChangeHandler(e)}
                        onKeyDown={handleKeyDown} // Detectar Enter aquí
                        placeholder="Día"
                    />
                    <input
                        id={styles.input}
                        type="text"
                        maxLength="2"
                        value={form.mes}
                        name="mes"
                        onChange={(e) => onFormChangeHandler(e)}
                        onKeyDown={handleKeyDown} // Detectar Enter aquí
                        placeholder="Mes"
                        ref={mesInputRef}
                    />
                    <input
                        id={styles.input}
                        type="text"
                        maxLength="4"
                        value={form.anio}
                        name="anio"
                        onChange={(e) => onFormChangeHandler(e)}
                        onKeyDown={handleKeyDown} // Detectar Enter aquí
                        placeholder="Año"
                        ref={anioInputRef}
                    />
                </div>
            </div>
            <div id={styles.inputContainer}>
                <span id={styles.label}>Ventas</span>
                <div id={styles.symbol}>
                    <span id={styles.labelInside}>$</span>
                    <input
                        id={styles.input}
                        type="text"
                        maxLength="8"
                        placeholder="Ventas"
                        value={form.ventas}
                        name="ventas"
                        onChange={(e) => onFormChangeHandler(e)}
                        onKeyDown={handleKeyDown} // Detectar Enter aquí
                        ref={ventasInputRef}
                    />
                </div>
            </div>
            <div id={styles.inputContainer}>
                <span id={styles.label}>Comisión</span>
                <div id={styles.symbol}>
                    <span id={styles.labelInside}>$</span>
                    <input
                        id={styles.input}
                        type="text"
                        maxLength="8"
                        placeholder="Comisión"
                        value={form.comision}
                        name="comision"
                        onChange={(e) => onFormChangeHandler(e)}
                        onKeyDown={handleKeyDown} // Detectar Enter aquí
                        ref={comisionInputRef}
                    />
                </div>
            </div>
            <div id={styles.inputContainer}>
                <span id={styles.labelBoton}>boton</span>
                <button
                    id={styles.sendButton}
                    onClick={() => sendData()}
                >
                    Cargar
                </button>
            </div>
        </div>
    );
}
