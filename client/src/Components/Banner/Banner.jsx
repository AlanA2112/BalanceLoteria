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

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();

            // Verificar y navegar según la hora
            if (hour === 10 && minutes === 15) {
                navigate('/previa');
            } else if (hour === 12 && minutes === 0) {
                navigate('/primera');
            } else if (hour === 15 && minutes === 0) {
                navigate('/matutina');
            } else if (hour === 18 && minutes === 0) {
                navigate('/vespertina');
            } else if (hour === 21 && minutes === 0) {
                navigate('/nocturna');
            }
        };

        const interval = setInterval(checkTime, 1000); // Verificar cada segundo

        return () => clearInterval(interval); // Limpiar al desmontar
    }, [navigate]);

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