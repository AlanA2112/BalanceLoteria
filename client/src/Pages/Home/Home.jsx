import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Banner from "../../Components/Banner/Banner"
import Formulario from "../../Components/FormularioResumen/Formulario";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div id={styles.homeContainer}>
            <Banner />
            <Formulario />
        </div>
    )
}