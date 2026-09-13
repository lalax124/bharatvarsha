const express = require("express");

const {
    chat,
    explain,
    compare,
    journey
} = require("../controllers/aicontrollers");

const router = express.Router();

router.post("/chat", chat);

router.post("/explain", explain);

router.post("/compare", compare);

router.post("/journey", journey);

module.exports = router;