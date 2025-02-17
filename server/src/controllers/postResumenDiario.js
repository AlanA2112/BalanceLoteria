const { Router } = require("express");
const { ResumenDiario } = require("../db");  // Aquí accedemos a 'ResumenDiario' correctamente
const router = Router();

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        const { dia, mes, anio, ventas, comision } = req.body;

        if (!dia || !mes || !anio || !ventas || !comision) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Guardar en la base de datos con Sequelize
        const nuevoRegistro = await ResumenDiario.create({ dia, mes, anio, ventas, comision });

        console.log("Registro agregado:", nuevoRegistro.toJSON());

        res.status(201).json({ mensaje: "Registro agregado correctamente", data: nuevoRegistro });
    } catch (error) {
        console.error("Error en /agregar:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
