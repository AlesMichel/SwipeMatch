const userDao = require("../../dao/user-dao");
const matchActionDao = require("../../dao/matchAction-dao");
const activeDao = require("../../dao/active-dao");

async function ListMatchesAbl(req, res) {
    try {
        const activeUserId = activeDao.getActiveUserId();
        if (!activeUserId) {
            return res.status(400).json({ message: "Select profile to browse from" });
        }

        const allActions = matchActionDao.list();

        // Koho aktivní user liknul - deduplikovat
        const iLiked = [...new Set(
            allActions
                .filter((a) => a.fromProfile === activeUserId && a.action === true)
                .map((a) => a.toProfile)
        )];

        // Kdo liknul aktivního usera
        const likedMe = new Set(
            allActions
                .filter((a) => a.toProfile === activeUserId && a.action === true)
                .map((a) => a.fromProfile)
        );

        // Mutual = oba dva se likli
        const matchedIds = iLiked.filter((id) => likedMe.has(id));

        // Sestav odpověď s daty profilu
        const matches = matchedIds.map((userId) => {
            const user = userDao.get(userId);
            const action = allActions.find(
                (a) => a.fromProfile === activeUserId && a.toProfile === userId && a.action === true
            );
            return {
                id: user.id,
                name: user.name,
                profileImage: user.profileImage || null,
                matched: action?.createdAt || null,
            };
        });

        res.json({ itemList: matches });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListMatchesAbl;