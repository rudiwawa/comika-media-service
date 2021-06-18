const { User } = require("../../../models");
const service = async function (req, res, next) {
  User.bulkCreate([
    {
      id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
      name: "Ghany Abdillah Ersa",
      email: "ghanyersa24@gmail.com",
      role: "admin",
      password: "$2b$10$r2k.xVfxhtbozKajPk3uX.pSg9MLZn2WYrpK33mHMcjOIhVtgrOV.",
    },
    {
      id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
      name: "Danang TP",
      email: "danang.tp@gmail.com",
      role: "admin",
      password: "$2b$10$r2k.xVfxhtbozKajPk3uX.pSg9MLZn2WYrpK33mHMcjOIhVtgrOV.",
    },
    {
      id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
      name: "Ridwan Fajar",
      email: "rdwn@gmail.com",
      role: "writer",
      password: "$2b$10$r2k.xVfxhtbozKajPk3uX.pSg9MLZn2WYrpK33mHMcjOIhVtgrOV.",
    },
  ]);
  next();
};
module.exports = { service };
