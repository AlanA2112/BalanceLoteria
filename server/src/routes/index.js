const { Router } = require('express');
const postResumenDiario = require("../controllers/postResumenDiario");
const edirResumenDiario = require("../controllers/editResumenDiario");
const getAllResumenDiario = require("../controllers/getAllResumenDiario");
const getResumen = require("../controllers/getResumen");
const deleteResumen = require("../controllers/deleteResumen");

const router = Router();

router.use("/resumen", postResumenDiario);
router.use("/resumen", editResumenDiario);
router.use("/resumen", getAllResumenDiario);
router.use("/resumen", getResumen);
router.use("/resumen", deleteResumen);
module.exports = router;