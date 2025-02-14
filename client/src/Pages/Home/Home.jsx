import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Banner from "../../Components/Banner/Banner"
import Formulario from "../../Components/FormularioResumen/Formulario";
import ListaMensual from "../../Components/ListaMensual/ListaMensual";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAll } from "../../redux/actions/actions";
import Grafico from "../../Components/Grafico/Grafico";
import GraficoMensual from "../../Components/GraficoMensual/GraficoMensual";
import ListaAnual from "../../Components/ListaAnual/ListaAnual";
import InformacionAnual from "../../Components/InformacionAnual/InformacionAnual";
import InformacionMensual from "../../Components/InformacionMensual/InformacionMensual";
import InformacionTotal from "../../Components/InformacionTotal/InformacionTotal";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lista = useSelector(state => state.listaResumenes);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch])

    return (
        <div id={styles.homeContainer}>
            <Banner />
            <Formulario />
            <div id={styles.informacion}>
                <InformacionMensual lista={lista} />
            </div>
            <div id={styles.informacion}>
                <InformacionAnual lista={lista} />
            </div>
            <div id={styles.informacion}>
                <InformacionTotal lista={lista} />
            </div>
        </div>
    )
}