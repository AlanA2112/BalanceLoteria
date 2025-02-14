import { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import { useNavigate } from "react-router-dom";

export default function Banner() {
    const [fecha, setFecha] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setFecha(new Date());
        }, 1000);

        // Limpiamos el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <div id={styles.bannerSuperior}>
            <div id={styles.logoContainer} onClick={(e) => { navigate("/"); }}>
                <img id={styles.logo}
                    src={require("../../Assets/LogoLargo.png")} />
            </div>
            <div id={styles.fechaContainer}>
                <span id={styles.fecha}>
                    {fecha.toLocaleString('es-ES', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                        hour12: false,
                    }).replace(',', '')}
                </span>
            </div>
            <div id={styles.nombreAgenciaContainer}>
                <span id={styles.nombreAgencia}>
                    Loter18
                </span>
            </div>
        </div>
    )
}