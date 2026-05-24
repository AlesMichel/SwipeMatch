const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        age: { type: "integer" },
        bio: { type: "string" },
        location: {
            type: "object",
            properties: {
                label: { type: "string" },
                lat: { type: "number" },
                lon: { type: "number" },
            },
            additionalProperties: false,
        },
        gender: { type: "string", enum: ["Male", "Female"] },
        profileImage: { type: "string" },
        mainImage: { type: "string" },
    },
    required: ["name", "age", "gender"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
    try {
        const body = req.body;

        const valid = ajv.validate(schema, body);
        if (!valid) {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
        }

        const user = userDao.create(body);
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = CreateAbl;