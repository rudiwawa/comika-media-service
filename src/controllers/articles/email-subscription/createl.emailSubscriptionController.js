const { EmailSubscription } = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
    try {
        const payload = {
            email: req.body.email
        };
        const requestDB = await EmailSubscription.create(payload);
        res.response = { msg: `Kamu akan mendapatkan notifikasi artikel terbaru kami`, data: requestDB };
    } catch (error) {
        res.response = {
            status: 500,
            msg: error.message,
        };
    }
    next();
};

const validation = [
    body("email", "email tidak boleh kosong").notEmpty().isEmail().withMessage("Email tidak valid")
];

module.exports = { service, validation };
