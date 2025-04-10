const { Router } = require('express');
const postResumenDiario = require("../controllers/postResumenDiario");
const editResumenDiario = require("../controllers/editResumenDiario");
const getAllResumenDiario = require("../controllers/getAllResumenDiario");
const getResumen = require("../controllers/getResumen");
const deleteResumen = require("../controllers/deleteResumen");
const googleVision = require("../controllers/googleVision");
const router = Router();

router.use("/resumen", postResumenDiario);
router.use("/resumen", editResumenDiario);
router.use("/resumen", getAllResumenDiario);
router.use("/resumen", getResumen);
router.use("/resumen", deleteResumen);
router.use("", googleVision);

module.exports = router;