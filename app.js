const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

const response = require("./src/helpers/response");
const record = require("./src/middlewares/record");
const routeAPIadmin = require("./src/routes/adminRoute");
const routeAPIPublic = require("./src/routes/publicRoute");

app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => res.json("WELCOME TO COMIKA MEDIA SERVICE"));
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
