const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/user/createAbl");
const ListAbl = require("../abl/user/listAbl");
const SetActiveAbl = require("../abl/user/setActiveAbl");
const GetActiveAbl = require("../abl/user/getActiveAbl");
const upload = require("../middleware/upload");
const UploadImageAbl = require("../abl/user/uploadImageAbl");



router.post("/active", SetActiveAbl);
router.post("/", CreateAbl);
router.get("/", ListAbl);
router.get("/active", GetActiveAbl);
router.post("/upload", upload.single("image"), UploadImageAbl);

module.exports = router;