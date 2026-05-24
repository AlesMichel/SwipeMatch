const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const folderPath = path.join(__dirname, "../storage/matchActionList");

function create(matchAction) {
    matchAction.id = crypto.randomBytes(16).toString("hex");
    matchAction.createdAt = new Date().toISOString();
    const filePath = path.join(folderPath, `${matchAction.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(matchAction), "utf8");
    return matchAction;
}

function list() {
    const files = fs.readdirSync(folderPath);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(path.join(folderPath, file), "utf8"));
    });
}

function listByFromProfile(fromProfileId) {
    return list().filter((item) => item.fromProfile === fromProfileId);
}

function isMutualLike(userAId, userBId) {
    const all = list();
    const aLikedB = all.find(
        (i) => i.fromProfile === userAId && i.toProfile === userBId && i.action === true
    );
    const bLikedA = all.find(
        (i) => i.fromProfile === userBId && i.toProfile === userAId && i.action === true
    );
    return !!(aLikedB && bLikedA);
}

module.exports = { create, list, listByFromProfile, isMutualLike };