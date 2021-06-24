const { Article, Record } = require("../models")

module.exports = async function (req, res, next) {
    try {
        const where = { slug: req.params.slug };
        const requestDB = await Article.scope("public").findOne({
            where,
        });
        if (!requestDB) {
            req.record.status = 404;
            req.record.msg = `artikel ${req.params.slug} tidak diketahui`;
            Record.create(req.record);
            return res.status(404).json({ msg: `artikel ${req.params.slug} tidak diketahui` });
        } else {
            req.article = requestDB.dataValues
            next()
        }
    } catch (error) {
        req.record.status = 500;
        req.record.msg = error.message;
        Record.create(req.record);
        return res.status(500).json({ msg: error.message });
    }
}