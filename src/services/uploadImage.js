const multer = require("multer");
const moment = require("moment");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "";
    switch (file.fieldname) {
      case "banner":
        dest = "article";
        break;
      case "img":
        dest = "jumbotron";
        break;
      case "src":
        dest = "source";
        break;
      default:
        break;
    }
    cb(null, "./uploads/" + dest);
  },
  filename: function (req, file, cb) {
    const typeFile = file.mimetype.replace("image/", "");
    if (typeFile == "png" || typeFile == "jpg" || typeFile == "jpeg") {
      const uniqueSuffix = req.auth.name.replace(/ /g, "-") + "_" + moment().format("YYMMDDHHmmss");
      cb(null, uniqueSuffix + "." + typeFile);
    } else cb("Hanya bisa menerima png,jpg,jpeg");
  },
  onError: function (err, next) {
    next(err);
  },
});

const upload = multer({ storage });
module.exports = upload;
