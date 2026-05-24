const fs = require("fs");
const path = require("path");

const activePath = path.join(__dirname, "../storage/activeUser/activeUser.json");

function getActiveUserId() {
    const data = fs.readFileSync(activePath, "utf8");
    return JSON.parse(data).activeUserId;
}

function setActiveUserId(userId) {
    fs.writeFileSync(activePath, JSON.stringify({ activeUserId: userId }), "utf8");
}

module.exports = { getActiveUserId, setActiveUserId };