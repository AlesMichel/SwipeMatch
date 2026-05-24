async function UploadImageAbl(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Žádný soubor nebyl nahrán" });
        }

        const imageUrl = `http://localhost:8888/uploads/${req.file.filename}`;
        res.json({ url: imageUrl });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UploadImageAbl;