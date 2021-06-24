
const { User } = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
    try {
        const requestDB = await User.update(
            { password: req.body.password },
            { where: { id: req.auth.id } }
        );
        if (requestDB) {
            res.response = { msg: "password berhasil diperbarui" };
        } else {
            res.response = {
                status: 400,
                msg: "pastikan link reset password kamu benar.",
            };
        }
    } catch (error) {
        res.response = { status: 500, msg: error.message };
    }
    next();
}

const validation = [
    body("password", "password tidak boleh kosong")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("password minimal 8 karakter"),
    body("passwordConfirmation", "password konfirmasi tidak boleh kosong")
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("password konfirmasi tidak cocok");
            }
            return true;
        })
]
module.exports = { service, validation }