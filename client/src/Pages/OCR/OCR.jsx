import { useNavigate } from "react-router-dom";
import styles from "./OCR.module.css";
import Banner from "../../Components/Banner/Banner";
import { useState } from "react";

export default function OCR() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({ fecha: '', monto: '' });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
            runOCR(file); // OCR con imagen original
        }
    };

    const runOCR = async (file) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('https://balance-production-13b3.up.railway.app/ocr', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setText(data.text || '');
            extractInfo(data.text || '');
        } catch (error) {
            console.error('Error en OCR:', error);
        } finally {
            setLoading(false);
        }
    };

    const extractInfo = (text) => {
        const fechaMatch = text.match(/\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/);
        const montoMatch = text.match(/(\$|USD)?\s?\d+[.,]?\d{0,2}/);

        setInfo({
            fecha: fechaMatch ? fechaMatch[0] : 'No detectada',
            monto: montoMatch ? montoMatch[0] : 'No detectado',
        });
    };

    return (
        <div id={styles.homeContainer}>
            <Banner />
            <div style={{ padding: 20 }}>
                <h2>OCR sin procesamiento</h2>
                <input type="file" accept="image/*" onChange={handleImageChange} />

                {image && <img src={image} alt="Imagen cargada" style={{ width: '300px', marginTop: 10 }} />}

                {loading && <p>Procesando imagen...</p>}
                {!loading && text && (
                    <>
                        <h4>Texto Detectado:</h4>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
                        <h4>Información extraída:</h4>
                        <p><strong>Fecha:</strong> {info.fecha}</p>
                        <p><strong>Monto:</strong> {info.monto}</p>
                    </>
                )}
            </div>
        </div>
    );
}
