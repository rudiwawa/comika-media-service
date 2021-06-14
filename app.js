const express = require("express");
const logger = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const response = require("./src/helpers/response");
app.use("/", require("./src/routes/authRoute"));

app.use("/users", require("./src/routes/userRoute"));
app.use("/article", require("./src/routes/articleRoute"));
app.use(response);

const { sequelize } = require("./src/models");
// sequelize.sync({ force: true });
sequelize.sync();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
