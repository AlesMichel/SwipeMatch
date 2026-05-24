const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../storage/uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = crypto.randomBytes(16).toString("hex");
        cb(null, name + ext);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Pouze obrázky jsou povoleny"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;