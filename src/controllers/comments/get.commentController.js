const { Comment } = require("../../models")

const service = async function (req, res, next) {
    try {
        const articleId = req.article.id
        const requestDB = await Comment.findAll({ where: { articleId }, order: [["createdAt", "DESC"]] })
        res.response = { data: requestDB }
    } catch (error) {
        res.response = { status: 500, msg: error.message }
    }
    next()
}
module.exports = { service }