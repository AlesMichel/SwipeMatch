const userDao = require("../../dao/user-dao");

async function ListAbl(req, res) {
    try {
        const userList = userDao.list();
        res.json({ itemList: userList });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;