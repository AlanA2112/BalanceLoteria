const { Router } = require("express");
const { ResumenDiario } = require("../db");  // Aquí accedemos a 'ResumenDiario' correctamente
const router = Router();

router.get('/getAll', async (req, res) => {
    try {
        // Obtener todos los registros de la tabla resumen_diario
        const resumenes = await ResumenDiario.findAll();

        // Verificar si hay registros
        if (resumenes.length === 0) {
            return res.status(404).send({ message: "No se encontraron registros" });
        }

        // Enviar los registros encontrados
        return res.status(200).json(resumenes);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error al obtener los registros", error });
    }
});

module.exports = router;