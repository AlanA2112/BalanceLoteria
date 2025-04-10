import { useNavigate } from "react-router-dom";
import styles from "./OCR.module.css";
import Banner from "../../Components/Banner/Banner"
import { useEffect, useRef, useState } from "react";
import Tesseract from 'tesseract.js';

export default function OCR() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [processedImageUrl, setProcessedImageUrl] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({ fecha: '', monto: '' });
    const canvasRef = useRef(null);
    const [contrast, setContrast] = useState(2.0); // valor inicial
    const [threshold, setThreshold] = useState(140); // valor inicial
    const [angle, setAngle] = useState(null); // ángulo detectado
    const [imageFile, setImageFile] = useState(null);
    const [contrastFactor, setContrastFactor] = useState(50);



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file); // <-- guardamos el archivo original
        }
    };

    useEffect(() => {
        if (imageFile) {
            preprocessImage(imageFile);
        }
    }, [contrastFactor, threshold]);


    const preprocessImage = (file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const avg = (r + g + b) / 3;
                const contrasted = (avg - 128) * contrastFactor + 128;
                const val = contrasted > threshold ? 255 : 0;

                data[i] = data[i + 1] = data[i + 2] = val;
            }

            applySharpenFilter(ctx, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                setProcessedImageUrl(url);
                runOCR(blob);
            }, 'image/png');
        };
    };


    function applySharpenFilter(ctx, width, height) {
        const weights = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ];

        const srcData = ctx.getImageData(0, 0, width, height);
        const dstData = ctx.createImageData(width, height);

        const src = srcData.data;
        const dst = dstData.data;

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                for (let c = 0; c < 3; c++) { // RGB channels
                    let i = (y * width + x) * 4 + c;
                    let newValue = 0;
                    let index = 0;

                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ni = ((y + dy) * width + (x + dx)) * 4 + c;
                            newValue += src[ni] * weights[index++];
                        }
                    }

                    dst[i] = Math.min(Math.max(newValue, 0), 255);
                }
                // Copy alpha
                dst[(y * width + x) * 4 + 3] = src[(y * width + x) * 4 + 3];
            }
        }

        ctx.putImageData(dstData, 0, 0);
    }


    const runOCR = async (blob) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', blob, 'imagen.png');

        try {
            const response = await fetch('https://balance-production-13b3.up.railway.app/ocr', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setText(data.text);
            extractInfo(data.text);
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
                <h2>OCR con procesamiento</h2>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Recibo original" style={{ width: '300px', marginTop: 10 }} />}
                <canvas ref={canvasRef} style={{ display: 'none' }} />

                {processedImageUrl && (
                    <>
                        <h4>Imagen procesada:</h4>
                        <img src={processedImageUrl} alt="Procesada para OCR" style={{ width: '300px', marginBottom: 10 }} />
                    </>
                )}
                <div style={{ marginTop: 20 }}>
                    <label>
                        Contraste: {contrastFactor}
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={contrastFactor}
                            onChange={(e) => setContrastFactor(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Umbral: {threshold}
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={threshold}
                            onChange={(e) => setThreshold(Number(e.target.value))}
                        />
                    </label>
                </div>

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
                {angle !== null && <p><strong>Ángulo detectado:</strong> {typeof angle === 'number' ? `${angle}°` : angle}</p>}


            </div>
        </div>
    )
}