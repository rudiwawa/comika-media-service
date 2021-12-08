const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

const response = require("./src/helpers/response");
const record = require("./src/middlewares/record");
const routeAPIadmin = require("./src/routes/adminRoute");
const routeAPIPublic = require("./src/routes/publicRoute");
const sendEmail = require("./src/services/sendEmail");

app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => res.json("WELCOME TO COMIKA MEDIA SERVICE"));
app.get("/email", async function (req, res, next) {
  try {
    const email = await sendEmail({ to: "ghanyersa24@gmail.com" });
    return res.json({ kekeke: email });
  } catch (error) {
    return res.json({ error: error.message });
  }
});
app.use(record);
app.use("/api", routeAPIPublic);
app.use("/api/admin", routeAPIadmin);
app.use(response);

const { sequelize } = require("./src/models");
// if (process.env.NODE_ENV == "development")
// sequelize.sync();
// sequelize.sync({ force: true });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
