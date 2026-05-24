const userDao = require("../../dao/user-dao");
const activeDao = require("../../dao/active-dao");

//v zdani jsou 2 datove entity a zadne prihlasovani, tady sice ukaldam uzivatele ale je to jenom aktinvi uzivatel na debug, ukladam to do jsonu misto SESSION tak snad to nevadi
async function SetActiveAbl(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }

        const user = userDao.get(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        activeDao.setActiveUserId(id);
        res.json({ message: `Active user set to ${user.name}`, user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = SetActiveAbl;