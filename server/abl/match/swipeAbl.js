const userDao = require("../../dao/user-dao");
const matchActionDao = require("../../dao/matchAction-dao");

async function SwipeAbl(req, res) {
    try {
        const { fromProfile, toProfile, action } = req.body;

        // Validace
        if (!fromProfile || !toProfile || action === undefined) {
            return res.status(400).json({ message: "fromProfile, toProfile a action jsou povinné" });
        }

        // Zkontroluj jestli oba profily existují
        const fromUser = userDao.get(fromProfile);
        if (!fromUser) {
            return res.status(404).json({ message: "fromProfile nenalezen" });
        }

        const toUser = userDao.get(toProfile);
        if (!toUser) {
            return res.status(404).json({ message: "toProfile nenalezen" });
        }

        // Ulož swipe akci
        const matchAction = matchActionDao.create({ fromProfile, toProfile, action });

        // Zkontroluj mutual like
        if (action === true) {
            const isMutual = matchActionDao.isMutualLike(fromProfile, toProfile);
            if (isMutual) {
                return res.json({ matchAction, info: "Match has been found" });
            }
        }

        res.json({ matchAction });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = SwipeAbl;