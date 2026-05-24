const express = require("express");
const router = express.Router();

const BrowseAbl = require("../abl/browse/browseAbl");

router.get("/", BrowseAbl);

module.exports = router;