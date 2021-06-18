const multer = require("multer");
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
      default:
        break;
    }
    cb(null, "./uploads/" + dest);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + file.mimetype.replace("image/", ""));
  },
});

const upload = multer({ storage });
module.exports = upload;
