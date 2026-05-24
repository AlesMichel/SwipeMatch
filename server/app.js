const express = require("express");
const app = express();
const port = 8888;

const userController = require("./controller/user");
const browseController = require("./controller/browse");
const matchController = require("./controller/match");

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "storage/uploads")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

app.use(express.json());

app.use("/api/users", userController);
app.use("/api/browse", browseController);
app.use("/api", matchController);

app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});