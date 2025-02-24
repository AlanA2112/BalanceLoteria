const { Router } = require("express");
const { ResumenDiario } = require("../db");
const router = Router();

router.put('/edit/:id', async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;  // Obtenemos el ID desde la URL
        const { dia, mes, anio, ventas, comision } = req.body;

        if (!dia || !mes || !anio || ventas === undefined || comision === undefined) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Buscar el resumen diario por ID
        const resumenExistente = await ResumenDiario.findByPk(id);

        if (!resumenExistente) {
            return res.status(404).json({ error: "No se encontró un resumen con el ID especificado" });
        }

        // Actualizar el registro con los nuevos valores
        await resumenExistente.update({ dia, mes, anio, ventas, comision });

        console.log("Registro actualizado:", resumenExistente.toJSON());

        res.status(200).json({ mensaje: "Registro actualizado correctamente", data: resumenExistente });
    } catch (error) {
        console.error("Error en /edit:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
