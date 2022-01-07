const { Article, Visitor, Subscription, sequelize } = require("../../models");
const moment = require("moment");
const service = async (req, res, next) => {
  try {
    const payload = {
      articleId: req.article.id,
      userId: req.auth ? req.auth.id : null,
    };
    Visitor.create(payload);
    const article = req.article;
    article.withFlayer = false;
    if (article.isPremium) {
      if (req.auth && (await isUserPremium(req.auth.id))) {
        res.response = { data: article };
      } else {
        article.withFlayer = true;
        res.response = { data: cannotAccessPremiun(article) };
      }
    } else res.response = { data: { ...article, withFlayer: false } };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const cannotAccessPremiun = (article) => {
  article.withFlayer = true;
  article.content = cutContent(article.content);
  return article;
};

const cutContent = (content) => {
  const sliceWithTagP = content.split("\n");
  let text = "";
  sliceWithTagP.map((paragrap, i) => {
    if (i < 3) text += paragrap;
  });
  return text;
};

const isUserPremium = async (userId) => {
  const isSubscribe = await Subscription.findOne({
    where: { userId, availableOn: moment().add(7, "hours") },
  });
  return isSubscribe ? true : false;
};

module.exports = { service };
