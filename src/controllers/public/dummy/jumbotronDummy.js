const { Jumbotron } = require("../../../models");
const service = async function (req, res, next) {
  try {
    Jumbotron.bulkCreate([
      {
        id: 1,
        img: "https://i.ytimg.com/vi/KFNxdXEe0Ko/maxresdefault.jpg",
        sequence: 1,
        link: "",
        isPhone: true,
        isDesktop: true,
      },
      {
        id: 2,
        img: "http://babussalambuana.com/wp-content/uploads/2014/03/Savin-NY-Website-Background-Web.jpg",
        sequence: 2,
        link: "https://comika.id/product/unthinkable/",
        isPhone: true,
        isDesktop: false,
      },
      {
        id: 3,
        img: "https://i.graphicmama.com/blog/wp-content/uploads/2020/03/17143932/Website-Backgrounds.png",
        sequence: 3,
        link: "https://comika.id/product/bchrul/",
        isPhone: false,
        isDesktop: true,
      },
    ]);
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
module.exports = { service };
