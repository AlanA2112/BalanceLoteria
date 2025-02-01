const { Router } = require("express");
const { ResumenDiario } = require("../db");  // Aquí accedemos a 'ResumenDiario' correctamente
const router = Router();

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.query; // Obtener el id de los parámetros de la ruta

        // Buscar y eliminar el registro con el id proporcionado
        const deleted = await ResumenDiario.destroy({
            where: { id: id }
        });

        // Verificar si el registro fue encontrado y eliminado
        if (deleted === 0) {
            return res.status(404).send({ message: "No se encontró el registro con ese ID" });
        }

        // Confirmar que el registro fue eliminado
        return res.status(200).send({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error al eliminar el registro", error });
    }
});

module.exports = router;
