const { Router } = require("express");
const { ResumenDiario } = require("../db");
const router = Router();

router.put('/edit/:id', async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;  // Obtener el ID desde la URL
        const { dia, mes, anio, ventas, comision } = req.body;

        // Buscar el resumen diario por ID
        const resumenExistente = await ResumenDiario.findByPk(id);

        if (!resumenExistente) {
            return res.status(404).json({ error: "No se encontró un resumen con el ID especificado" });
        }

        // Crear un objeto con solo los campos proporcionados
        const datosActualizados = {};
        if (dia !== undefined) datosActualizados.dia = dia;
        if (mes !== undefined) datosActualizados.mes = mes;
        if (anio !== undefined) datosActualizados.anio = anio;
        if (ventas !== undefined) datosActualizados.ventas = ventas;
        if (comision !== undefined) datosActualizados.comision = comision;

        // Verificar si hay algo que actualizar
        if (Object.keys(datosActualizados).length === 0) {
            return res.status(400).json({ error: "No se enviaron datos para actualizar" });
        }

        // Actualizar solo los campos proporcionados
        await resumenExistente.update(datosActualizados);

        console.log("Registro actualizado:", resumenExistente.toJSON());

        res.status(200).json({ mensaje: "Registro actualizado correctamente", data: resumenExistente });
    } catch (error) {
        console.error("Error en /edit:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
