const userDao = require("../../dao/user-dao");
const matchActionDao = require("../../dao/matchAction-dao");
const activeDao = require("../../dao/active-dao");

//distance na filter vzdalenosti
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
async function BrowseAbl(req, res) {
    try {
        const activeUserId = activeDao.getActiveUserId();
        if (!activeUserId) {
            return res.status(400).json({ message: "Select profile to browse from" });
        }

        const activeUser = userDao.get(activeUserId);
        const allUsers = userDao.list();

        const others = allUsers.filter((u) => u.id !== activeUserId);
        if (others.length === 0) {
            return res.status(400).json({ message: "Add new profile" });
        }

        const interactions = matchActionDao.listByFromProfile(activeUserId);
        const interactedIds = new Set(interactions.map((i) => i.toProfile));

        // Filtry z paramsu
        const ageMin = req.query.ageMin ? parseInt(req.query.ageMin) : 18;
        const ageMax = req.query.ageMax ? parseInt(req.query.ageMax) : 99;
        const gender = req.query.gender || null;
        const distance = req.query.distance ? parseInt(req.query.distance) : null;
        const likeBack = req.query.likeBack === "true";

        // likeBack — kdo liknul aktivního uživatele
        let likedMeIds = null;
        if (likeBack) {
            const allActions = matchActionDao.list();
            likedMeIds = new Set(
                allActions
                    .filter((a) => a.toProfile === activeUserId && a.action === true)
                    .map((a) => a.fromProfile)
            );
        }

        const notInteracted = others.filter((u) => !interactedIds.has(u.id));

        if (notInteracted.length === 0) {
            return res.status(200).json({ message: "Its all for today :)" });
        }

        const candidates = notInteracted.filter((user) => {
            if (user.age < ageMin || user.age > ageMax) return false;
            if (gender && user.gender !== gender) return false;
            if (likeBack && likedMeIds && !likedMeIds.has(user.id)) return false;

            // Distance filtr
            if (distance && activeUser.location?.lat && user.location?.lat) {
                const km = haversineDistance(
                    activeUser.location.lat, activeUser.location.lon,
                    user.location.lat, user.location.lon
                );
                if (km > distance) return false;
            }

            return true;
        });

        if (candidates.length === 0) {
            return res.status(400).json({ message: "No user found based on your preferences" });
        }

        const random = candidates[Math.floor(Math.random() * candidates.length)];
        res.json(random);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = BrowseAbl;