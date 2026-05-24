const express = require("express");
const router = express.Router();

const SwipeAbl = require("../abl/match/swipeAbl");

router.post("/match", SwipeAbl);

const ListMatchesAbl = require("../abl/match/listMatchesAbl");

router.get("/matches", ListMatchesAbl);

module.exports = router;