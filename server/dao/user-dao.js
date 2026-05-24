const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const folderPath = path.join(__dirname, "../storage/userList");

function create(user) {
    user.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(folderPath, `${user.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(user), "utf8");
    return user;
}

function list() {
    const files = fs.readdirSync(folderPath);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(path.join(folderPath, file), "utf8"));
    });
}

function get(userId) {
    try {
        const filePath = path.join(folderPath, `${userId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadUser", message: error.message };
    }
}

module.exports = { create, list, get };