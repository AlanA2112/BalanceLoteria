const { Router } = require("express");
const { ResumenDiario } = require("../db");  // Aquí accedemos a 'ResumenDiario' correctamente
const router = Router();
const multer = require('multer');
const cors = require('cors');
const vision = require('@google-cloud/vision');
const path = require('path');

// Configurar Multer para subir archivos
const upload = multer({ storage: multer.memoryStorage() });

// Configurar cliente de Google Vision
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, 'google-credentials.json'),
});

router.post('/ocr', upload.single('image'), async (req, res) => {
    try {
      const [result] = await client.textDetection(req.file.buffer);
      const detections = result.textAnnotations;
      const text = detections.length > 0 ? detections[0].description : 'No se detectó texto';
  
      res.json({ text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al procesar la imagen' });
    }
  });

module.exports = router;
