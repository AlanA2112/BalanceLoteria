const { Router } = require("express");
const { ResumenDiario } = require("../db");  // Aquí accedemos a 'ResumenDiario' correctamente
const router = Router();

router.get('/getResumen', async (req, res) => {
    try {
        const { dia, mes, anio } = req.query; // Obtener los valores de query params
        
        // Verificar si los parámetros fueron proporcionados
        if (!dia || !mes || !anio) {
            return res.status(400).send({ message: "Faltan parámetros: dia, mes o anio" });
        }

        // Buscar el registro que coincide con dia, mes y anio
        const resumen = await ResumenDiario.findOne({
            where: {
                dia: dia,
                mes: mes,
                anio: anio
            }
        });

        // Verificar si se encontró el registro
        if (!resumen) {
            return res.status(404).send({ message: "No se encontró el registro" });
        }

        // Enviar el registro encontrado
        return res.status(200).json(resumen);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error al obtener el registro", error });
    }
});

module.exports = router;
