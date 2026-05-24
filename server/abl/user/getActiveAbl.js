const userDao = require("../../dao/user-dao");
const activeDao = require("../../dao/active-dao");

async function GetActiveAbl(req, res) {
    try {
        const activeUserId = activeDao.getActiveUserId();
        if (!activeUserId) {
            return res.status(400).json({ message: "Select profile to browse from" });
        }

        const user = userDao.get(activeUserId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = GetActiveAbl;